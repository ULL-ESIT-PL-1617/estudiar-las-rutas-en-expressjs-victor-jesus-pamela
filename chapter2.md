# Routing

### Lo básico:
Routing se puede definir como la forma de responder que tiene el servidor a las solicitudes de URLs del cliente. Si quieres una explicación básica sobre routing puedes encontrar una [aquí](chapter2.md).

Un ejemplo muy sencillo de routing es el que se mostrará a continuación, el cual sólo responde ante la solicitud de la raíz:
```javascript
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
```

### Métodos de routing:
Los métodos de routing que usa express son derivados de los que usa HTTP, estos siendo: GET, POST, PUT, HEAD, DELETE, OPTIONS, TRACE, COPY, LOCK, MKCOL, MOVE, PURGE, PROPFIND, PROPPATCH, UNLOCK, REPORT, MKACTIVITY, CHECKOUT, MERGE, M-SEARCH, NOTIFY, SUBSCRIBE, UNSUBSCRIBE, PATCH, SEARCH and CONNECT.
A continuación se mostrará un ejemplo de los métodos más comunes, GET y POST:
```javascript
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
```
Si algún nombre de método es inválido en JavaScript, se utilizarán los corchetes: `app.get['M-SEARCH']('/', function...`

Además, existe un método extra que se utiliza para recibir solicitudes mediante todos los métodos y responder, es el método all:
```javascript
app.all('/', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

### Caminos de las rutas:
Los caminos son las URLs a las que el cliente quiere acceder, es decir, el primer argumento de los métodos de routing.
Ya hemos visto que `'/'` hace una solicitud a la raíz, pero se pueden añadir strings `'/capitulo1'`, también puedes usar expresiones regulares usando los caracteres '?', '+', '*', '()', '.' y '-'.
Además, si se necesita usar un caracter especial como el '$' se puede meter entre corchetes y usar el escape de caracteres '[\$]'.

Algunos ejemplos de caminos de rutas son:
```javascript
app.get('/about', function (req, res) {
  res.send('about')
})
app.get('/random.text', function (req, res) {
  res.send('random.text')
})
app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})
```

### Parámetros de las rutas:
