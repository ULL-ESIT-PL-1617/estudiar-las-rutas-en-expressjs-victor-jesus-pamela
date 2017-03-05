var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('default', function() {

});

gulp.task('ejemploRutas', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node ejemploRutas.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});

gulp.task('ejemploAPI', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("node ejemploAPI.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});