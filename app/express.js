let path = require('path');
let express = require('express');
let exphbs  = require('express-handlebars');
let utils = require('./utils/server');
let app = express();
let server = require('http').Server(app);
let port = process.env.PORT || 8080;

// view engine setup
app.engine('.hbs', exphbs({
    partialsDir: [path.join(__dirname, 'views/partials/')],
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public/static')));

// Test URL for React migration. TODO: Delete after converting to SPA
app.get('/singleplayer', function (req, res) {
    res.render('singleplayer');
});

app.get('/*', function (req, res) {
    if (req.url == '/') {
        res.redirect('/' + utils.randomString(5));
    } else {
        res.render('index');
    }
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = server;
