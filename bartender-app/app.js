// Import Express and Node's path tool
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Tell Express to use EJS for our views (the View part of MVC)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Let the app read data from forms (like the order form)
app.use(express.urlencoded({ extended: true })); // parse form POST data
app.use(express.json());

// Let the app serve our CSS file from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Load all our routes and connect them to the app
const routes = require('./routes/index');
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});