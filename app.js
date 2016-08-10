var pg = require('./dbcon.js')
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');

//needed for POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', (process.env.PORT || 5000));

app.use(session({secret:'A large red axe'}));

app.use(express.static('public'));
// views is directory for all template files
app.set('views', __dirname + '/views');

app.get('/logout', function(req, res, next) {
  var context = {}
  req.session.destroy();
  res.redirect('/');
});

app.post('/login', function(req, res, next) {
  var context = {}
  var user = req.body.iuser;
  var pass = req.body.ipass;
  if(pass != 'axemurder'){
    res.render('login', context);
    return;
  }
  req.session.name = 'red axe';
  res.redirect('/');
});

app.get('/', function(req, res, next) {
  var context = {}
  if (!checkValid(req)) {
    res.render('login', context);
    return;
  }
  pg.pool.query('SELECT * from links', function(err, result) {
    console.log(result.rows[0]); // output: foo
    context.rows = result.rows;
    res.render('home', context);
});
});

app.post('/remove', function(req, res, next) {
  if (!checkValid(req)) return '';
  pg.pool.query('DELETE from links WHERE id=($1)', [req.body.id], function(err, result) {
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

app.post('/update', function(req, res, next) {
  if (!checkValid(req)) return '';
  var link = req.body.link;
  var text = req.body.text;
  var id = req.body.id;
  pg.pool.query('UPDATE links SET link=($1), text=($2) WHERE id=($3)', [link, text, id], function(err, result) {
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

app.post('/insert', function(req, res, next) {
  if (!checkValid(req)) return '';
  var link = req.body.link;
  var text = req.body.text;
  pg.pool.query('INSERT into links (link, text) VALUES ($1, $2)', [link, text], function(err, result) {
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

function checkValid(req) {
  if(req.session.name != 'red axe'){
    return false;
  }
  return true
}
