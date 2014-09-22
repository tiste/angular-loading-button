gulp        = require('gulp')
connect     = require('gulp-connect')
uglify      = require('gulp-uglify')
stylus      = require('gulp-stylus')
header      = require('gulp-header')
rename      = require('gulp-rename')
pkg         = require('./package.json')

paths =
  scripts: 'angular-loading-button.js'
  stylus: 'example/**/*.styl'

banner = """
         /**
          * <%= pkg.name %> - v<%= pkg.version %>
          * <%= pkg.description %>
          * <%= pkg.homepage %>
          * Licensed <%= pkg.license %>
          */\n
         """

gulp.task 'connect', ->
  connect.server
    livereload: true

gulp.task 'scripts', ->
  gulp.src(paths.scripts)
      .pipe(uglify())
      .pipe(header(banner, pkg: pkg))
      .pipe(rename('angular-loading-button.min.js'))
      .pipe(gulp.dest('.'))
      .pipe(connect.reload())

gulp.task 'stylus', ->
  gulp.src(paths.stylus)
      .pipe(stylus(use: require('nib')()))
      .pipe(gulp.dest('example'))
      .pipe(connect.reload())

gulp.task 'watch', ->
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.stylus, ['stylus'])

gulp.task 'build', ['scripts', 'stylus']
gulp.task 'default', ['scripts', 'stylus', 'connect', 'watch']
