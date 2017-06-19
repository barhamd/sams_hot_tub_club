const gulp = require('gulp');
const $    = require('gulp-load-plugins')();

const folder = {
  src:   'src/',
  build: 'build/'
};

const sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src(folder.src + 'scss/main.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.cleanCss())
    .pipe(gulp.dest(folder.build + 'css'));
});

const jsFiles = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/dist/foundation.js',
  'bower_components/highcharts/highcharts.js',
  folder.src + 'js/main.js'
]

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(folder.build + 'js'));
});

gulp.task('haml', function() {
  return gulp.src(folder.src + 'haml/index.haml')
  .pipe($.haml())
  .pipe(gulp.dest(folder.build));
});

gulp.task('default', ['haml', 'sass', 'js'], function() {
  gulp.watch([folder.src + 'scss/**/*'],  ['sass']);
  gulp.watch([folder.src + 'haml/**/*'],  ['haml']);
  gulp.watch([folder.src + 'js/**/*'],    ['js']);
});
