var pg = require('./dbcon.js')
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

app.use(express.static('public'));
// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next) {
  var context = {}
  pg.pool.query('SELECT * from links', function(err, result) {
    console.log(result.rows[0]); // output: foo
    context.rows = result.rows;
    res.render('home', context);
});
});

app.post('/insert', function(req, res, next) {
  var key = req.body.key;
  console.log(key);
  if (key != "axemurder") {
  console.log("not key");
  } else {
  console.log("yes key");
  }
  var link = req.body.link;
  var text = req.body.text;
  pg.pool.query('INSERT into links (link, text) VALUES (?, ?)', [link, text], function(err, result) {
    if (err) {
      next(err);
      return;
    }
    pg.pool.query('SELECT * from links', function(err, result) {
      rows = JSON.stringify(result.rows);
      res.send(rows);
    });
  });
});

app.listen(app.get('port'), function() { console.log('Scratch is running on port', app.get('port')); });


