/**
 * Índice principal de rutas
 */
const express = require('express');
const router = express.Router();

// Importar todas las rutas
const authRoutes = require('./auth');
const procesosRoutes = require('./procesos');
const recomendacionesRoutes = require('./recomendaciones');
const chatbotRoutes = require('./chatbot');
const dashboardRoutes = require('./dashboard');
const adminRoutes = require('./admin');
const etlRoutes = require('./etl');

// Registrar rutas con sus prefijos
router.use('/auth', authRoutes);
router.use('/procesos', procesosRoutes);
router.use('/recomendaciones', recomendacionesRoutes);
router.use('/chatbot', chatbotRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/admin', adminRoutes);
router.use('/etl', etlRoutes);

// Ruta de salud general
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'SEACE ProjectFinder API - Node.js Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;