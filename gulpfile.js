const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

// gulp.task('name', function() {
//   return gulp.src('source-folder')
//     .pipe(function)
//     .pipe(anotherFunction)
//     .pipe(gulp.dest('destination-folder'))
// })

gulp.task('css', function () {
  return gulp.src('src/sass/styles.scss') // …/sass/**/*.scss
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

gulp.task('copy', function () {
  return gulp.src('src/**/*.+(html|js)')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

// gulp.task('copy', function () {
//   return gulp.src('src/js/*.js')
//     .pipe(gulp.dest('dist/js'))
//     .pipe(browserSync.stream())
// })

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('watch', ['browserSync', 'css'], function () {
  gulp.watch('src/sass/**/*.scss', ['css'])
  gulp.watch('src/**/*.+(html|js)', ['copy'])
  // gulp.watch('src/js/*.js', ['copy'])
})
