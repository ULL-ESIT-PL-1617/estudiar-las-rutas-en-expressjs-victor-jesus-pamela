var app = express();

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.get('/', function(req, res) {
  res.send('Hola mundo!');
});

app.get('/help', function(req, res) {
  res.send('Ayuda!');
});
