var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('default', function() {

});

gulp.task('build', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("npm run generate-gitbook", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});

gulp.task('deploy', function() {
  return gulp.src('./gh-pages/**/*').pipe(ghPages());
});

gulp.task('serve', function() {
  var exec = require('child_process').exec;
    var child;
    child = exec("sudo node scripts/serve.js", 
                function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});
