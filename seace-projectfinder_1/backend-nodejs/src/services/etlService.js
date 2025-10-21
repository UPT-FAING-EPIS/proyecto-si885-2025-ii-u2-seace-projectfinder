/**
 * Servicio de ETL
 */
const { ScrapingTask, ETLLog, Proceso } = require('../models');
const { Op } = require('sequelize');
const logger = require('../config/logger');

class ETLService {
  async createScrapingTask(params, userId = null) {
    try {
      const task = await ScrapingTask.create({
        user_id: userId,
        parametros_busqueda: params,
        estado: 'pendiente'
      });

      logger.info(`Tarea de scraping creada: ${task.id}`);
      return task;
    } catch (error) {
      logger.error(`Error en createScrapingTask: ${error.message}`);
      throw error;
    }
  }

  async getScrapingTask(taskId) {
    try {
      const task = await ScrapingTask.findByPk(taskId);
      if (!task) throw new Error('Tarea no encontrada');
      return task;
    } catch (error) {
      logger.error(`Error en getScrapingTask: ${error.message}`);
      throw error;
    }
  }

  async updateScrapingTask(taskId, updateData) {
    try {
      const task = await ScrapingTask.findByPk(taskId);
      if (!task) throw new Error('Tarea no encontrada');

      await task.update({
        ...updateData,
        updated_at: new Date()
      });

      return task;
    } catch (error) {
      logger.error(`Error en updateScrapingTask: ${error.message}`);
      throw error;
    }
  }

  async getScrapingTasks(filters = {}) {
    try {
      const { page = 1, size = 20, estado, user_id } = filters;
      const whereClause = {};

      if (estado) whereClause.estado = estado;
      if (user_id) whereClause.user_id = user_id;

      const offset = (page - 1) * size;
      const { count, rows } = await ScrapingTask.findAndCountAll({
        where: whereClause,
        offset,
        limit: size,
        order: [['created_at', 'DESC']]
      });

      return {
        items: rows,
        total: count,
        page: parseInt(page),
        size: parseInt(size),
        pages: Math.ceil(count / size)
      };
    } catch (error) {
      logger.error(`Error en getScrapingTasks: ${error.message}`);
      throw error;
    }
  }

  async startScraping(params) {
    try {
      const operationId = require('uuid').v4();
      const startTime = Date.now();

      // Crear log de ETL
      const etlLog = await ETLLog.create({
        operation_type: 'scraping',
        operation_id: operationId,
        status: 'running',
        message: 'Iniciando proceso de scraping',
        search_params: params
      });

      logger.info(`Scraping iniciado: ${operationId}`, { params });

      // Ejecutar scraping en background
      this.performScraping(operationId, params, startTime).catch(err => {
        logger.error(`Error en scraping background: ${err.message}`);
      });

      return {
        operation_id: operationId,
        status: 'started',
        message: 'Proceso de scraping iniciado. Puede monitorear el progreso en los logs de ETL.'
      };
    } catch (error) {
      logger.error(`Error en startScraping: ${error.message}`);
      throw error;
    }
  }

  async performScraping(operationId, params, startTime) {
    const SeaceScraper = require('../scraper/SeaceScraper');
    const scraper = new SeaceScraper();
    
    try {
      // Inicializar scraper
      await scraper.initialize();
      logger.info(`Scraper inicializado para operación ${operationId}`);

      // Ejecutar búsqueda
      const results = await scraper.searchProcesses({
        keywords: params.keywords || ['software'],
        objetoContratacion: params.objetoContratacion || 'Servicio',
        anio: params.anio || new Date().getFullYear().toString(),
        maxProcesses: params.maxProcesses || 100,
        departamento: params.departamento,
        estadoProceso: params.estadoProceso,
        entidad: params.entidad,
        tipoProceso: params.tipoProceso
      });

      logger.info(`Scraping completado: ${results.length} procesos encontrados`);

      // Guardar procesos en la base de datos
      let savedCount = 0;
      let errorCount = 0;

      for (const procesoData of results) {
        try {
          await Proceso.findOrCreate({
            where: { id_proceso: procesoData.id_proceso },
            defaults: procesoData
          });
          savedCount++;
        } catch (err) {
          logger.error(`Error guardando proceso: ${err.message}`);
          errorCount++;
        }
      }

      // Actualizar log de ETL
      const duration = Date.now() - startTime;
      await ETLLog.update(
        {
          status: 'completed',
          message: `Scraping completado: ${savedCount} procesos guardados, ${errorCount} errores`,
          process_count: savedCount,
          error_count: errorCount,
          duration_ms: duration
        },
        {
          where: { operation_id: operationId }
        }
      );

      logger.info(`Operación ${operationId} completada en ${duration}ms`);

    } catch (error) {
      logger.error(`Error durante scraping: ${error.message}`);
      
      // Actualizar log con error
      const duration = Date.now() - startTime;
      await ETLLog.update(
        {
          status: 'failed',
          message: `Error en scraping: ${error.message}`,
          error_count: 1,
          duration_ms: duration
        },
        {
          where: { operation_id: operationId }
        }
      );
    } finally {
      // Cerrar scraper
      try {
        await scraper.close();
      } catch (err) {
        logger.error(`Error cerrando scraper: ${err.message}`);
      }
    }
  }

  async getETLLogs(filters = {}) {
    try {
      const { page = 1, size = 50, operation_type, status } = filters;
      const whereClause = {};

      if (operation_type) whereClause.operation_type = operation_type;
      if (status) whereClause.status = status;

      const offset = (page - 1) * size;
      const { count, rows } = await ETLLog.findAndCountAll({
        where: whereClause,
        offset,
        limit: size,
        order: [['created_at', 'DESC']]
      });

      return {
        items: rows,
        total: count,
        page: parseInt(page),
        size: parseInt(size),
        pages: Math.ceil(count / size)
      };
    } catch (error) {
      logger.error(`Error en getETLLogs: ${error.message}`);
      throw error;
    }
  }

  async getETLStats() {
    try {
      const totalOperations = await ETLLog.count();
      const completedOperations = await ETLLog.count({ where: { status: 'completed' } });
      const failedOperations = await ETLLog.count({ where: { status: 'failed' } });
      const runningOperations = await ETLLog.count({ where: { status: 'running' } });

      const avgDuration = await ETLLog.average('duration_ms', {
        where: { status: 'completed' }
      });

      return {
        total_operations: totalOperations,
        completed: completedOperations,
        failed: failedOperations,
        running: runningOperations,
        avg_duration_ms: Math.round(avgDuration || 0)
      };
    } catch (error) {
      logger.error(`Error en getETLStats: ${error.message}`);
      throw error;
    }
  }

  async syncProcesses(params) {
    try {
      const operationId = require('uuid').v4();
      
      const etlLog = await ETLLog.create({
        operation_type: 'sync',
        operation_id: operationId,
        status: 'running',
        message: 'Sincronizando procesos'
      });

      logger.info(`Sincronización iniciada: ${operationId}`);

      return {
        operation_id: operationId,
        status: 'started',
        message: 'Sincronización iniciada'
      };
    } catch (error) {
      logger.error(`Error en syncProcesses: ${error.message}`);
      throw error;
    }
  }

  async generateEmbeddings(procesoId = null) {
    try {
      const operationId = require('uuid').v4();
      
      const etlLog = await ETLLog.create({
        operation_type: 'embedding',
        operation_id: operationId,
        status: 'running',
        message: procesoId ? `Generando embedding para proceso ${procesoId}` : 'Generando embeddings para todos los procesos'
      });

      logger.info(`Generación de embeddings iniciada: ${operationId}`);

      return {
        operation_id: operationId,
        status: 'started',
        message: 'Generación de embeddings iniciada'
      };
    } catch (error) {
      logger.error(`Error en generateEmbeddings: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ETLService();