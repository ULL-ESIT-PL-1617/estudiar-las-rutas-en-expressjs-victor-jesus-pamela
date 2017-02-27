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
Los parámetros son segmentos en la URL que se usan para grabar los valores pasados en esa posición de la URL, guardándolos en el objeto req.params, con el nombre del parámetro como llave del valor. Es decir, que si una URL tiene la forma de '/usuario/:userID' y se accede mediante '/usuario/1234' el valor '1234' quedará guardado en req.params con la clave userID.
Ejemplo:
```javascript
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```
También puedes utilizar el caracter '.' para indicar varios parámetros separados por '.' en la URL de la solicitud.
```javascript
app.get('/users/:userId.:userPass/books/:bookId', function (req, res) {
  res.send(req.params)
})
```

### Manejar rutas:
Para manejar rutas se puede usar una sola función como hemos visto hasta ahora con `'app.get()'` o `'app.post()'`, o podemos usar un array de funciones que se ejecuten una detrás de otra para imponer condiciones antes de responder a la solicitud, por ejemplo.
Un ejemplo de array de funciones sería:
```javascript
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```
También se pueden mezclar ambos manejos:
```javascript
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

### Métodos de respuesta:
Los métodos de respuesta se usan para responder al cliente y terminar el ciclo de solicitud-respuesta. Si no se usa ningún método de respuesta, la solicitud del cliente se quedará colgando.
Los métodos de respuesta son:
```javascript
res.download()	Devuelve un archivo para ser descargado.
res.end()	     Finaliza el proceso de respuesta.
res.json()	    Devuelve una respuesta en forma de JSON.
res.jsonp()	   Devuelve una respuesta JSON que soporta JSONP.
res.redirect()	Redirecciona la solicitud.
res.render()	  Renderiza una plantilla de página.
res.send()	    Devuelve una respuesta que puede ser de varios tipos.
res.sendFile()	Envía un archivo en forma de flujo octet.
res.sendStatus()  Formatea el estado de la respuesta y lo envía en el cuerpo de la misma.
```

### App.route()
La función `'app.route('ruta')'` te permite encadenar los manejos de ruta comentados con anterioridad.
Ejemplo:
```javascript
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```
Como podemos observar sólo es necesario especificar la ruta una vez, evitando así repeticiones y dentro de la función se especifica qué hacer para cada método de solicitud.

### express.Router
