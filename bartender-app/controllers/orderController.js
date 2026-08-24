const orderModel = require('../models/orderModel');
const cocktailModel = require('../models/cocktailModel');

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

exports.showOrderQueue = (req, res) => {
  const orders = orderModel.getAllOrders();
  res.render('orderQueue', { orders });
};

exports.markReady = (req, res) => {
  const { id } = req.params;
  orderModel.updateOrderStatus(id, 'Ready for Pickup');
  res.redirect('/order-queue');
};

exports.clearQueue = (req, res) => {
  orderModel.clearAllOrders();
  res.redirect('/order-queue');
};