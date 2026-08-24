const cocktailModel = require('../models/cocktailModel');

exports.showMenu = (req, res) => {
  const cocktails = cocktailModel.getAllCocktails();
  res.render('menu', { cocktails });
};