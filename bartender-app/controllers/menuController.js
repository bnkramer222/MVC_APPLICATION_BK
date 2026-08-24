// Import the cocktail model so this controller can ask it for data
const cocktailModel = require('../models/cocktailModel');

// This function handles showing the cocktail menu.
// Controller asks the Model for the list of cocktails,
// then sends that data to the View to display it.
exports.showMenu = (req, res) => {
  const cocktails = cocktailModel.getAllCocktails();
  res.render('menu', { cocktails });
};