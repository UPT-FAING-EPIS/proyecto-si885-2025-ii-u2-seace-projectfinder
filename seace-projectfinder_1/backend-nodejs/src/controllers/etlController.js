/**
 * Controlador de ETL
 */
const etlService = require('../services/etlService');
const logger = require('../config/logger');

class ETLController {
  async startScraping(req, res, next) {
    try {
      const params = req.body;
      const result = await etlService.startScraping(params);
      res.json({ success: true, data: result });
    } catch (error) {
      logger.error(`Error en startScraping: ${error.message}`);
      next(error);
    }
  }

  async createScrapingTask(req, res, next) {
    try {
      const params = req.body;
      const userId = req.user?.id;
      
      const task = await etlService.createScrapingTask(params, userId);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  async getScrapingTask(req, res, next) {
    try {
      const { task_id } = req.params;
      const task = await etlService.getScrapingTask(task_id);
      res.json({ success: true, data: task });
    } catch (error) {
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getScrapingTasks(req, res, next) {
    try {
      const filters = {
        page: parseInt(req.query.page) || 1,
        size: parseInt(req.query.size) || 20,
        estado: req.query.estado,
        user_id: req.query.user_id
      };

      const result = await etlService.getScrapingTasks(filters);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateScrapingTask(req, res, next) {
    try {
      const { task_id } = req.params;
      const updateData = req.body;
      
      const task = await etlService.updateScrapingTask(task_id, updateData);
      res.json({ success: true, data: task });
    } catch (error) {
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getETLLogs(req, res, next) {
    try {
      const filters = {
        page: parseInt(req.query.page) || 1,
        size: parseInt(req.query.size) || 50,
        operation_type: req.query.operation_type,
        status: req.query.status
      };

      const result = await etlService.getETLLogs(filters);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getETLStats(req, res, next) {
    try {
      const stats = await etlService.getETLStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  async syncProcesses(req, res, next) {
    try {
      const params = req.body;
      const result = await etlService.syncProcesses(params);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async generateEmbeddings(req, res, next) {
    try {
      const { proceso_id } = req.body;
      const result = await etlService.generateEmbeddings(proceso_id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ETLController();