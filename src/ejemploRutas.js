var express = require("express");
var app = express();
var path = require("path");

app.set('views', path.join(__dirname) + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

//Rutas normales
app.get('/', function (req, res) {
  res.send('Raiz');
});
app.get('/noraiz', function (req, res) {
  res.send('No raiz')
})

//Ejemplo parametros
app.get('/parametros/:algo', function (req, res) {
  res.send(req.params);
});

//Ejemplo handler
var cb0 = function (req, res, next) {
  console.log('Handler0');
  next();
};
var cb1 = function (req, res, next) {
  console.log('Handler1');
  next();
};
var cb2 = function (req, res) {
  res.send('Hola desde Handler3!');
};
app.get('/handler', [cb0, cb1, cb2]);

//Ejemplo route
app.route('/route')
  .get(function (req, res) {
    res.send('Get a random book');
  })
  .post(function (req, res) {
    res.send('Add a book');
  })
  .put(function (req, res) {
    res.send('Update the book');
  });

var server = app.listen((process.env.PORT || 8080), function(){
})