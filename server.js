// Dependencies
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'/.env')});
const express = require('express');
const sequelize = require('./config/connection');

// Define server and port
const PORT = 3001;
const app = express();

// Enable base middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Enable sessions

// Enable template engine

// Enable modular routing

// Provide catch-all routes

// Require sequelize model sync before listening
async function init () {
  await sequelize.sync({force: false});
  app.listen(PORT, () => console.log(`BioInventory now listening on port ${PORT}. ✨🧪✨`));
}

// Initialize
init();