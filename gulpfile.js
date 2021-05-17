const gulp = require('gulp');
const data = require('gulp-data');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

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
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    options: {
    browser: "google chrome",
    proxy: "localhost:3001",
    notify: false
    }   
  })
})

gulp.task('watch', gulp.series(['browserSync', 'sass']), function (){
  gulp.watch('app/scss/**/*.scss', gulp.series(['sass'])); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});
