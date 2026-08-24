const orderModel = require('../models/orderModel');
const cocktailModel = require('../models/cocktailModel');

// Handle new order submission (POST from menu page)
exports.createOrder = (req, res) => {
  const { cocktailId, patronName } = req.body;
  const cocktail = cocktailModel.getCocktailById(cocktailId);

  if (!cocktail) {
    return res.status(400).send('Invalid cocktail selected');
  }

  orderModel.createOrder(cocktail.id, cocktail.name, patronName || 'Guest');
  res.redirect('/order-confirmation');
};

exports.showConfirmation = (req, res) => {
  res.render('orderConfirmation');
};

// Bartender view of the order queue
exports.showOrderQueue = (req, res) => {
  const orders = orderModel.getAllOrders();
  res.render('orderQueue', { orders });
};

// Mark an order ready for pickup
exports.markReady = (req, res) => {
  const { id } = req.params;
  orderModel.updateOrderStatus(id, 'Ready for Pickup');
  res.redirect('/order-queue');
};