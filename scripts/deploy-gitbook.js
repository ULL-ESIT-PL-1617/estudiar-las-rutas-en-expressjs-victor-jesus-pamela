var ghpages = require('gh-pages');
var path = require('primeros-pasos-en-nodejs-victor-jesus-pamela');
 
ghpages.publish(path.join(__dirname, 'primeros-pasos-en-nodejs-victor-jesus-pamela'), function(err) {  });