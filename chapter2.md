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
