// This function handles the homepage.
// When someone visits the site, it just shows the index page (View).
exports.showHome = (req, res) => {
  res.render('index');
};