const express = require('express');
const router = express.Router();

// Import the controllers that will handle each route
const indexController = require('../controllers/indexController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');

// Home page
router.get('/', indexController.showHome);

// Patron: view menu
router.get('/menu', menuController.showMenu);

// Patron: place order
router.post('/order', orderController.createOrder);

// Patron: see confirmation after placing an order
router.get('/order-confirmation', orderController.showConfirmation);

// Bartender: view order queue
router.get('/order-queue', orderController.showOrderQueue);

// Bartender: mark one order ready for pickup
router.post('/order-queue/:id/ready', orderController.markReady);

// Bartender: clear the entire queue
router.post('/order-queue/clear', orderController.clearQueue);

// Make these routes available to app.js
module.exports = router;