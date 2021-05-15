const gulp = require('gulp');
const data = require('gulp-data');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  .pipe(data(function() {
    return require('./app/data.json')
  }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('app'))
});

function errorHandler(err) {
  // Logs out error in the command line
  console.log(err.toString());
  // Ends the current pipe, so Gulp watch doesn't break
  this.emit('end');
}

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', errorHandler)) //Compiles Sass to CSS with gulp-sass
  .pipe(gulp.dest('app/css'))
})