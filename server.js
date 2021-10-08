// Bringing in packages for express server, handlebars and sequelize
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Bringing in controllers directory routes, sequelize config, and helper functions
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Declaring variables for express server and port
const app = express();
const PORT = process.env.PORT || 3002;

// Session configuration with cookie timeout at 15minutes
const sess = {
  secret: 'Super secret secret',
  cookie: {
    expires: 900000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use express-session with the session configuration
app.use(session(sess));

// Create an instance of handlebars with helpers functions
const hbs = exphbs.create({ helpers });

// Using and setting the template engine to handlebars for rendering VIEW
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Data parsing and enabling use of static files in public directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Enabling use of routes
app.use(routes);

// Start sequelize database listening on port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});