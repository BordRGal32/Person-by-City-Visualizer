/*jslint node: true */
'use strict';

// app set up
var express = require('express');
var app = express();
// var mongo = require('mongodb');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes/index');
var api = require('./routes/api');
var http = require('http');


// app configuration
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use('/', routes);
app.use('/api', api);


http.createServer(app).listen(app.get('port'), function() {
    console.log('listening on ' + app.get('port'));
})

module.exports = app;
