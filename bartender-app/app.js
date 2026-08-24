const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form POST data
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes/index');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});