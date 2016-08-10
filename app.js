var pg = require('./dbcon.js')
var opbeat = require('opbeat').start({ // perf monitoring
    appId: 'scratch',
    organizationId: 'gopinath',
    secretToken: 'my-very-sekrit-token',
    active: process.env.NODE_ENV === 'production'
})

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//needed for POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next) {
  var context = {}
  context.rows = [
    {"link" : "/", "text" : "Home"},
    {"link" : "http://www.google.com", "text" : "google"},
  ];
  res.render('home', context);
});

app.listen(app.get('port'), function() { console.log('Scratch is running on port', app.get('port')); });


