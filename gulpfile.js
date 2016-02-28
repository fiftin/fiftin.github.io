var gulp = require('gulp');
var bower = require('gulp-bower');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('bower', function() {
  return bower();
});

gulp.task('vendor:clean', function() {
  return del(['vendor/**/*']);
});

gulp.task('vendor:bootstrap:js', function() {
  return gulp.src(
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap/bootstrap.min.js'
  ).pipe(gulp.dest('vendor/bootstrap'));
});

gulp.task('vendor:bootstrap:css', function() {
  return gulp.src(
    'bower_components/bootstrap-sass/assets/stylesheets/**/*'
  ).pipe(gulp.dest('vendor/bootstrap/stylesheets'));
});

gulp.task('vendor:bootstrap', ['vendor:bootstrap:js', 'vendor:bootstrap:css']);

gulp.task('vendor:jquery', function() {
  return gulp.src(
    'bower_components/jquery/dist/jquery.min.js'
  ).pipe(gulp.dest('vendor/jquery'));
});

gulp.task('jekyll', function (done){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});
  jekyll.on('exit', function(code) {
    done(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('default', function() {
  runSequence('bower', 'vendor:clean', ['vendor:bootstrap', 'vendor:jquery'], 'jekyll');
});
