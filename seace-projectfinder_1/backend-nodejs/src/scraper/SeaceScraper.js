/**
 * Scraper para el portal SEACE usando Puppeteer
 */
const puppeteer = require('puppeteer');
const logger = require('../config/logger');

class SeaceScraper {
  constructor(options = {}) {
    this.options = {
      headless: true,
      timeout: 60000,
      ...options
    };
    this.browser = null;
    this.page = null;
  }

  /**
   * Inicializar navegador
   */
  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: this.options.headless,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ],
        executablePath: process.env.CHROME_BIN || '/usr/bin/chromium-browser'
      });

      this.page = await this.browser.newPage();
      await this.page.setDefaultNavigationTimeout(this.options.timeout);
      await this.page.setViewport({ width: 1280, height: 800 });

      logger.info('Scraper inicializado correctamente');
    } catch (error) {
      logger.error('Error al inicializar scraper:', error);
      throw error;
    }
  }

  /**
   * Buscar procesos en SEACE
   */
  async searchProcesses(params = {}) {
    const {
      keywords = ['software'],
      objetoContratacion = 'Servicio',  // Nuevo: tipo de objeto (Bien, Servicio, Obra, Consultoría)
      anio = new Date().getFullYear().toString(),  // Nuevo: año de la convocatoria
      maxProcesses = 100,
      departamento = null,
      estadoProceso = null,
      fechaDesde = null,
      fechaHasta = null,
      entidad = null,
      tipoProceso = null
    } = params;

    try {
      if (!this.browser) {
        await this.initialize();
      }

      const results = [];
      const baseUrl = 'https://prodapp2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml';

      logger.info(`Iniciando búsqueda en SEACE`, { 
        keywords: keywords.join(', '),
        maxProcesses,
        entidad,
        tipoProceso
      });

      await this.page.goto(baseUrl, { 
        waitUntil: 'networkidle2',
        timeout: this.options.timeout 
      });

      logger.info('Página SEACE cargada, esperando formulario...');

      // Esperar a que cargue completamente el formulario
      await this.page.waitForTimeout(3000);

      // PASO 1: Seleccionar "Objeto de Contratación" (Servicio, Bien, Obra, Consultoría)
      try {
        logger.info(`Intentando seleccionar Objeto de Contratación: ${objetoContratacion}`);
        
        // Buscar el dropdown de "Objeto de Contratación"
        const objetoDropdownSelectors = [
          'select[id*="objetoContratacion"]',
          'select[name*="objetoContratacion"]',
          'select[id*="objeto"]',
          '#frmBusquedaAvanzada\\:idObjetoContratacion',
          'select.ui-selectonemenu'
        ];

        let objetoSelected = false;
        for (const selector of objetoDropdownSelectors) {
          try {
            const element = await this.page.$(selector);
            if (element) {
              // Seleccionar el valor especificado (por defecto "Servicio")
              await this.page.select(selector, objetoContratacion).catch(() => {
                // Si no funciona por valor, intentar por texto
                return this.page.evaluate((sel, valor) => {
                  const select = document.querySelector(sel);
                  if (select) {
                    const options = Array.from(select.options);
                    const targetOption = options.find(opt => 
                      opt.text.toLowerCase().includes(valor.toLowerCase()) ||
                      opt.value.toLowerCase().includes(valor.toLowerCase())
                    );
                    if (targetOption) {
                      select.value = targetOption.value;
                      select.dispatchEvent(new Event('change', { bubbles: true }));
                      return true;
                    }
                  }
                  return false;
                }, selector, objetoContratacion);
              });
              
              logger.info(`✓ Objeto de Contratación seleccionado: ${objetoContratacion}`);
              objetoSelected = true;
              await this.page.waitForTimeout(1000);
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!objetoSelected) {
          logger.warn('⚠ No se pudo seleccionar Objeto de Contratación automáticamente');
        }
      } catch (err) {
        logger.warn(`Error seleccionando Objeto de Contratación: ${err.message}`);
      }

      // PASO 2: Ingresar "Descripción del Objeto" (palabras clave)
      try {
        const descripcionTexto = Array.isArray(keywords) ? keywords.join(' ') : keywords;
        logger.info(`Intentando ingresar Descripción del Objeto: ${descripcionTexto}`);
        
        const descripcionSelectors = [
          'input[id*="descripcionObjeto"]',
          'input[name*="descripcionObjeto"]',
          'input[id*="descripcion"]',
          'textarea[id*="descripcion"]',
          '#frmBusquedaAvanzada\\:idDescripcionObjeto'
        ];

        let descripcionFilled = false;
        for (const selector of descripcionSelectors) {
          try {
            const element = await this.page.$(selector);
            if (element) {
              await this.page.click(selector);
              await this.page.type(selector, descripcionTexto, { delay: 100 });
              logger.info(`✓ Descripción del Objeto ingresada: ${descripcionTexto}`);
              descripcionFilled = true;
              await this.page.waitForTimeout(1000);
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!descripcionFilled) {
          logger.warn('⚠ No se pudo ingresar Descripción del Objeto automáticamente');
        }
      } catch (err) {
        logger.warn(`Error ingresando Descripción del Objeto: ${err.message}`);
      }

      // PASO 3: Seleccionar "Año de la Convocatoria" (especificado o año actual)
      try {
        logger.info(`Intentando seleccionar Año de la Convocatoria: ${anio}`);
        
        const anioSelectors = [
          'select[id*="anioConvocatoria"]',
          'select[name*="anioConvocatoria"]',
          'select[id*="anio"]',
          '#frmBusquedaAvanzada\\:anioConvocatoria'
        ];

        let anioSelected = false;
        for (const selector of anioSelectors) {
          try {
            const element = await this.page.$(selector);
            if (element) {
              await this.page.select(selector, anio).catch(() => {
                // Si no funciona directamente, buscar la opción
                return this.page.evaluate((sel, year) => {
                  const select = document.querySelector(sel);
                  if (select) {
                    const options = Array.from(select.options);
                    const yearOption = options.find(opt => opt.text.includes(year) || opt.value === year);
                    if (yearOption) {
                      select.value = yearOption.value;
                      select.dispatchEvent(new Event('change', { bubbles: true }));
                      return true;
                    }
                  }
                  return false;
                }, selector, anio);
              });
              
              logger.info(`✓ Año de la Convocatoria seleccionado: ${anio}`);
              anioSelected = true;
              await this.page.waitForTimeout(1000);
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!anioSelected) {
          logger.warn('⚠ No se pudo seleccionar Año de la Convocatoria automáticamente');
        }
      } catch (err) {
        logger.warn(`Error seleccionando Año de la Convocatoria: ${err.message}`);
      }

      // PASO 4: Hacer clic en el botón "Buscar"
      try {
        logger.info('Buscando botón "Buscar"...');
        
        const searchButtonSelectors = [
          'button[id*="buscar"]',
          'input[type="submit"]',
          'button[type="submit"]',
          'button:has-text("Buscar")',
          'input[value*="Buscar"]',
          '#frmBusquedaAvanzada\\:btnBuscar'
        ];

        let searchClicked = false;
        for (const selector of searchButtonSelectors) {
          try {
            const element = await this.page.$(selector);
            if (element) {
              logger.info(`Haciendo clic en botón Buscar con selector: ${selector}`);
              
              await Promise.all([
                this.page.click(selector),
                this.page.waitForNavigation({ 
                  waitUntil: 'networkidle2', 
                  timeout: 30000 
                }).catch(() => {
                  logger.warn('No hubo navegación, continuando...');
                })
              ]);
              
              logger.info('✓ Búsqueda ejecutada');
              searchClicked = true;
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!searchClicked) {
          logger.warn('⚠ No se pudo hacer clic en Buscar, intentando con evaluación directa');
          
          // Intento alternativo: buscar y hacer clic mediante evaluate
          await this.page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button, input[type="submit"]'));
            const searchBtn = buttons.find(btn => 
              btn.textContent.toLowerCase().includes('buscar') ||
              btn.value?.toLowerCase().includes('buscar')
            );
            if (searchBtn) {
              searchBtn.click();
            }
          });
          
          await this.page.waitForTimeout(3000);
        }
      } catch (err) {
        logger.error(`Error haciendo clic en Buscar: ${err.message}`);
      }

      // PASO 5: Esperar a que carguen los resultados
      logger.info('Esperando resultados...');
      await this.page.waitForTimeout(5000);

      // PASO 6: Extraer resultados de la tabla de procesos
      try {
        logger.info('Extrayendo procesos de la tabla de resultados...');
        
        // Esperar tabla de resultados
        await this.page.waitForSelector('table, .dataTable, .ui-datatable', { timeout: 10000 }).catch(() => {
          logger.warn('No se encontró tabla de resultados inmediatamente');
        });
        
        const processRows = await this.page.evaluate((maxProc) => {
          const rows = [];
          
          // Buscar tablas con diferentes selectores
          const tables = document.querySelectorAll('table, .dataTable, .ui-datatable-data, tbody');
          
          for (const table of tables) {
            const tableRows = table.querySelectorAll('tr');
            
            for (const row of tableRows) {
              if (rows.length >= maxProc) break;
              
              const cells = row.querySelectorAll('td');
              
              // Verificar que la fila tenga suficientes celdas
              if (cells.length >= 5) {
                try {
                  // Extraer datos según la estructura de SEACE
                  const processData = {
                    numero: cells[0]?.textContent?.trim() || '',
                    entidad: cells[1]?.textContent?.trim() || '',
                    nomenclatura: cells[2]?.textContent?.trim() || '',
                    objeto_contratacion: cells[4]?.textContent?.trim() || '',
                    descripcion: cells[5]?.textContent?.trim() || '',
                    fecha_publicacion: cells[3]?.textContent?.trim() || new Date().toISOString(),
                    codigo_snip: cells[6]?.textContent?.trim() || '',
                    version_seace: cells[8]?.textContent?.trim() || 'SEACE 3'
                  };
                  
                  // Validar que tenga datos mínimos
                  if (processData.entidad && processData.descripcion) {
                    rows.push(processData);
                  }
                } catch (err) {
                  console.error('Error procesando fila:', err);
                }
              }
            }
            
            if (rows.length >= maxProc) break;
          }
          
          return rows;
        }, maxProcesses);

        logger.info(`✓ Extraídos ${processRows.length} procesos de la tabla`);
        
        // Procesar y normalizar datos
        for (const row of processRows) {
          try {
            const procesoId = `SEACE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            results.push({
              id_proceso: procesoId,
              url_proceso: baseUrl,
              numero_convocatoria: row.nomenclatura,
              entidad_nombre: row.entidad,
              entidad_ruc: null,
              objeto_contratacion: row.descripcion,
              tipo_proceso: null,
              estado_proceso: 'Convocado',
              fecha_publicacion: this.parseDate(row.fecha_publicacion),
              fecha_limite_presentacion: null,
              monto_referencial: null,
              moneda: 'PEN',
              rubro: 'Servicios',
              departamento: null,
              provincia: null,
              distrito: null,
              requiere_visita_previa: false,
              datos_ocds: null,
              complejidad_estimada: null,
              categoria_proyecto: this.categorizarProyecto(row.descripcion)
            });
          } catch (err) {
            logger.warn(`Error procesando fila: ${err.message}`);
          }
        }

      } catch (err) {
        logger.error(`Error extrayendo resultados: ${err.message}`);
      }

      logger.info(`✅ Scraping completado. Procesos encontrados: ${results.length}`);
      return results;
    } catch (error) {
      logger.error('❌ Error durante el scraping:', error);
      throw error;
    }
  }

  /**
   * Parsear fecha
   */
  parseDate(dateStr) {
    if (!dateStr) return new Date();
    
    try {
      // Formato esperado: "17/10/2025 15:51"
      const parts = dateStr.split(' ');
      if (parts.length > 0) {
        const dateParts = parts[0].split('/');
        if (dateParts.length === 3) {
          const [day, month, year] = dateParts;
          return new Date(`${year}-${month}-${day}`);
        }
      }
    } catch (err) {
      logger.warn(`Error parseando fecha: ${dateStr}`);
    }
    
    return new Date();
  }

  /**
   * Categorizar proyecto
   */
  categorizarProyecto(objetoContratacion) {
    if (!objetoContratacion) return 'Otros';
    
    const texto = objetoContratacion.toLowerCase();
    const keywordsTI = ['software', 'sistema', 'aplicaci', 'desarrollo', 'implementaci', 'ti', 'tecnolog', 'inform', 'web', 'app', 'digital'];
    
    for (const keyword of keywordsTI) {
      if (texto.includes(keyword)) {
        return 'TI';
      }
    }
    
    return 'Otros';
  }

  /**
   * Obtener detalles de un proceso
   */
  async getProcessDetails(processId) {
    try {
      if (!this.browser) {
        await this.initialize();
      }

      const url = `https://prodapp2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml?idProceso=${processId}`;
      
      await this.page.goto(url, { waitUntil: 'networkidle2' });

      // Extraer detalles del proceso
      const details = await this.page.evaluate(() => {
        // Implementar extracción de datos
        return {};
      });

      logger.info(`Detalles obtenidos para proceso ${processId}`);
      return details;
    } catch (error) {
      logger.error(`Error obteniendo detalles del proceso ${processId}:`, error);
      throw error;
    }
  }

  /**
   * Cerrar navegador
   */
  async close() {
    try {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.page = null;
        logger.info('Scraper cerrado correctamente');
      }
    } catch (error) {
      logger.error('Error al cerrar scraper:', error);
      throw error;
    }
  }
}

module.exports = SeaceScraper;