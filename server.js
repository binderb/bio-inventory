// Dependencies
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exhbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

// Define server and port
const PORT = 3001;
const app = express();

// Enable base middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Enable sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 24 hours
    httpOnly: true,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// Enable template engine
const hbs = exhbs.create({
  helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Enable modular routing
app.use(routes);

// Provide catch-all routes

// Require sequelize model sync before listening
async function init () {
  await sequelize.sync({alter: true});
  app.listen(PORT, () => console.log(`BioInventory now listening on port ${PORT}. ✨🧪✨`));
}

// Initialize
init();