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

const jsFiles = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/dist/foundation.js',
  'bower_components/highcharts/highcharts.js',
  folder.src + 'js/main.js'
];

let devBuild = (process.env.NODE_ENV !== 'production')

gulp.task('sass', function() {
  let cssBuild = gulp.src(folder.src + 'scss/main.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))

  if (!devBuild) {
    cssBuild = cssBuild
      .pipe($.cleanCss())
  }

    return cssBuild.pipe(gulp.dest(folder.build + 'css'));
});

gulp.task('js', function() {
  let jsBuild =  gulp.src(jsFiles)
    .pipe($.concat('main.js'));

  if (!devBuild) {
    jsBuild = jsBuild
    .pipe($.uglify());
  }

    return jsBuild.pipe(gulp.dest(folder.build + 'js'));
});

gulp.task('haml', function() {
  return gulp.src(folder.src + 'haml/index.haml')
  .pipe($.haml())
  .pipe(gulp.dest(folder.build));
});

gulp.task('build', ['haml', 'sass', 'js'])

gulp.task('default', ['build'], function() {
  gulp.watch([folder.src + 'scss/**/*'],  ['sass']);
  gulp.watch([folder.src + 'haml/**/*'],  ['haml']);
  gulp.watch([folder.src + 'js/**/*'],    ['js']);
});
