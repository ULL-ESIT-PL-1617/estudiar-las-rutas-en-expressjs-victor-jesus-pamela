# Middleware

Middleware es el concepto base detrás del routing y procesamiento de peticiones en Express. Comprende un número arbitrario de funciones que son invocadas por la capa de routing de Express antes que sea invocado el manejador de peticiones final. De ahí su nombre, de ser una capa media entre la petición en bruto y la ruta final. Se le suele añadir el término stack (middleware stack) debido a que una característica importante es que se ejecutan las diferentes capas en el orden en el que son añadidas.

## Explicación de su functionamiento

Lo siguiente es un código sencillo usando Express:
```javascript
var app = express();

app.get('/', function(req, res) {
  res.send('Hola mundo!');
});

app.get('/help', function(req, res) {
  res.send('Ayuda!');
});
```

Este código básico responderá a peticiones a "/" con "Hola mundo!" y a peticiones a "/help" con "Ayuda!".
Si quisiésemos añadir alguna funcionalidad aparte como registrar las peticiones hechas podemos conseguirlo a través de middleware. Se añade una capa intermedia antes de llegar a nuestras rutas finales:

```javascript
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
```

Usando `app.use()` insertamos una nueva capa que ha de ejecutarse antes de resolver la petición. Para hacer diseños más complejos también hay que explicar los tres objetos principales del middleware.

## req, res y next
El request `req` es la petición HTTP que generó un evento y response `res` es la respuesta que se le va a devolver.

La función next es particularmente importante: Deja saber que esa capa ya ha terminado y que puede entregar el trabajo ya a la siguiente.
Es importante llamar a éste método puesto que Express necesita confirmación explícita que tu operación ha terminado antes de pasar a la capa siguiente.
