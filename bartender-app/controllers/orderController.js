// Import the models this controller needs to talk to
const orderModel = require('../models/orderModel');
const cocktailModel = require('../models/cocktailModel');

// This function handles a patron submitting an order.
// It reads the form data, checks the cocktail is real,
// then tells the Model to save the order.
exports.createOrder = (req, res) => {
  const { cocktailId, patronName } = req.body;
  const cocktail = cocktailModel.getCocktailById(cocktailId);

  // If the cocktail doesn't exist, stop here and show an error
  if (!cocktail) {
    return res.status(400).send('Invalid cocktail selected');
  }

  // Save the order (default to "Guest" if no name was entered)
  orderModel.createOrder(cocktail.id, cocktail.name, patronName || 'Guest');

  // Send the patron to a confirmation page
  res.redirect('/order-confirmation');
};

// Shows the "order placed" confirmation page
exports.showConfirmation = (req, res) => {
  res.render('orderConfirmation');
};

// This function handles the bartender viewing the order queue.
// Controller asks the Model for all current orders,
// then sends that data to the View to display it.
exports.showOrderQueue = (req, res) => {
  const orders = orderModel.getAllOrders();
  res.render('orderQueue', { orders });
};

// This function handles the bartender marking one order as ready.
// It grabs the order's id from the URL and tells the Model to update it.
exports.markReady = (req, res) => {
  const { id } = req.params;
  orderModel.updateOrderStatus(id, 'Ready for Pickup');
  res.redirect('/order-queue');
};

// This function handles the bartender clearing the whole queue.
// It tells the Model to delete all orders, then reloads the queue page.
exports.clearQueue = (req, res) => {
  orderModel.clearAllOrders();
  res.redirect('/order-queue');
};