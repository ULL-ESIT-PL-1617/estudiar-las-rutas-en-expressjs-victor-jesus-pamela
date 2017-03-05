# Router API

Un objeto `router` es una instancia aislada de middleware y rutas. Puedes pensar que es como una "mini-aplicación", capaz
solo de realizar funciones de middleware y routing. Cada aplicación Express tiene una app router integrada.

Un router se comporta como middleware en sí mismo, así que puedes usarlo como un argumento a app.use() o como el argumento
al método use() de otro router. 

El objeto express de más alto nivel tiene un método Router() que crea un nuevo objeto router.

Una vez has creado un objeto router, puedes añadirle middleware y rutas de métodos HTTP (como get, put, post, etc.) como a 
una aplicación. Por ejemplo:

```javascript
// invocado para cualquier petición a este router
router.use(function(req, res, next) {
  // .. algo de lógica aquí como en cualquier otro middleware.
  next();
});

// se encargará de cualquier petición que termine en /events
// depende de donde se llame al "use()" del router.
router.get('/events', function(req, res, next) {
  // ..
});
```

Puedes usar entonces el router para una raíz URL particular de esta manera separando tus rutas en ficheros o mini-apps.

```javascript
// solo peticiones a /calendar/* serán enviadas a nuestro "router"
app.use('/calendar', router);
```

##Métodos

###router.all(path, [callback, ...] callback)

Este método es igual a los métodos router.METHOD(), excepto que encaja con cualquier método HTTP (verbos).

Este método es muy útil para mapear lógica "global" para prefijos de caminos específicos o emparejamientos arbitrarios.
Por ejemplo, si has colocado la siguiente ruta al principio de todas las demás definiciones de rutas, requeriría que todas las
rutas desde ese momento requiriesen autenticación y que se cargara autométicamente un usuario. 

```javascript
router.all('*', requireAuthentication, loadUser);
```

O el equivalente:

```javascript
router.all('*', requireAuthentication)
router.all('*', loadUser);
```

###router.METHOD(path, [callback, ...] callback)

Los métodos router.METHOD proveen la funcionalidad de routing en Express, donde METHOD es uno de los método HTTP,, como
GET, PUT, POST, etc, en minúscula.

El siguiente trozo de código ilustra la definición más simple de ruta. Express traduce los strings de camino a expresiones
regulares, usadas internamente para emparejar peticiones. Los strings de consultas no se consideran al realizar esos emparejamientos,
por ejemplo "GET /" emparejaría con la siguiente ruta, al igual que "GET /?name=tobi".

```javascript
router.get('/', function(req, res){
  res.send('hello world');
});
```

También puedes usar expresiones regulares-útiles si tienes restricciones muy específicas, por ejemplo, lo siguiente emparejaría
"GET /commits/71dbb9c" al igual que “GET /commits/71dbb9c..4c084f9”.

```javascript
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

###router.param(name, callback)

Añade disparadores de callbacks a los parámetros de rutas, donde `name` es el nombre del parámetro y `callback` es la función
de callback.

Por ejemplo, cuando `:user` esta presente en una ruta, puedes mapear lógica de carga de usuario para proveer autimáticamente con
req.user a la ruta, o realizar validaciones en la input del parámetro.

```javascript
router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

###router.route(path)

Devuelve una instancia de una sola ruta que puedes usar para encargarte de verbos HTTP con middleware opcional. Usa 
router.route() para evitar nombres duplicados de rutas y por lo tanto errores.

El siguiente código muestra cómo usar router.route() para especificar varios handlers de métodos HTTP.

```javascript
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  req.user.name = req.params.name;
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});
```

###router.use([path], [function, ...] function)

Usa el la función o funciones middleware especificadas, con una ruta opcional de montaje, que por defecto es "/".

Este método es similar a app.use(). Ejemplo:

```javascript
var express = require('express');
var app = express();
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.use('/bar', function(req, res, next) {
  next();
});

router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```
