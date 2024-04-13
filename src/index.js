const express = require('express');
const app = express();
const { create } = require('express-handlebars');
const todoRoute = require('../routes/todo');
const mongoose = require('mongoose');
require("dotenv").config();
const cssHelper = require('../utils/util')

// Handlebarsni o'rnatish
const hbs = create({ defaultLayout: "main", extname: ".hbs", helpers: cssHelper });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views'); 

// main middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(todoRoute);

// mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});