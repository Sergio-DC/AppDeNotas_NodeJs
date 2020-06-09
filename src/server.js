const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

var hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  // Specify helpers which are only registered on this instance.
  helpers: {
      ifCond: function(v1, v2, options) {
        console.log('v1: ', v1);
        console.log('v2: ', v2);
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
  }
});


// Helper HandleBar
app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes/users.routes'));
app.use(require('./routes/notes.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;