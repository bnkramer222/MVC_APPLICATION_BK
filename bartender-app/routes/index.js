const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');

// Home page
router.get('/', indexController.showHome);

// Patron: view menu
router.get('/menu', menuController.showMenu);

// Patron: place order
router.post('/order', orderController.createOrder);
router.get('/order-confirmation', orderController.showConfirmation);

// Bartender: view order queue
router.get('/order-queue', orderController.showOrderQueue);

// Bartender: mark order ready
router.post('/order-queue/:id/ready', orderController.markReady);

module.exports = router;