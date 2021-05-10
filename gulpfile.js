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

gulp.task('sass', function() {
  return gulp.src('app/scss/styles.scss')
  .pipe(sass()) //Compiles Sass to CSS wit gulp-sass
  .pipe(gulp.dest('app/css'))
})