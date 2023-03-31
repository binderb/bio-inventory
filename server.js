// Dependencies
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import express from 'express';
import sequelize from './config/connection.js';
import exhbs from 'express-handlebars';
import * as helpers from './utils/helpers.js';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
const SequelizeStore = connectSessionSequelize(session.Store);
import routes from './routes/index.js';

// Define server and port
const PORT = process.env.PORT || 3001;
const app = express();

// Enable base middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, process.env.BASE_URL + 'public')));

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

// Enable modular routing, with base url
app.use(process.env.BASE_URL, routes);
// This middleware is required to pass the base url to Handlebars
// app.use("*", function(req, res, next){
//   res.locals.baseUrl = process.env.BASE_URL
//   next();
// });

// Provide catch-all routes

// Require sequelize model sync before listening
async function init () {
  await sequelize.sync({force: false});
  app.listen(PORT, () => console.log(`BioInventory now listening on port ${PORT}. ✨🧪✨`));
}

// Initialize
init();