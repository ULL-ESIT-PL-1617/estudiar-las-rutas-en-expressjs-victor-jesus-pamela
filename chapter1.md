# Routing básico
Routing se puede definir como la forma de responder que tiene el servidor a las solicitudes HTTP (get, post, ...) de URLs del cliente.
Cada ruta puede tener una o más funciones de manejo que se encargarán de mandar la respuesta correcta y estas son ejecutadas cuando la ruta de la solicitud coincide con la marcada en la función de manejo.
La definición de una ruta se hace de la siguiente manera:
```javascript
app.METHOD(PATH, HANDLER)
```
Donde METHOD es alguno de los métodos HTTP como GET o POST, PATH es la ruta a la que responde la función y HANDLER es la función que indica lo que hará el manejador para responder la solicitud.

Algunos ejemplos de routing son:
```javascript
//Este llevará a la página principal
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//Lo mismo pero con el método POST
app.post('/', function (req, res) {
  res.send('Got a POST request')
})

//Este responderá la solicitud de eliminar en la página user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```