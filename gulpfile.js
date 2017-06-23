const gulp = require('gulp');
const $    = require('gulp-load-plugins')();
const env  = require ('gulp-env');

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

let prodBuild = (process.env.NODE_ENV === 'production')
let stagBuild = (process.env.NODE_ENV === 'staging')
let devBuild = (!(prodBuild || stagBuild))
env({file:'.env.json'});

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

gulp.task('deploy', ['build'], function(){
  env.set({
    hostName: !prodBuild ? process.env.stagHost : process.env.prodHost
  });
  gulp.src(folder.build + '**')
    .pipe($.rsync({
      root: 'build',
      username:    process.env.userName,
      hostname:    process.env.hostName,
      destination: process.env.destination
  }));
  env.reset;
});

gulp.task('default', ['build'], function() {
  gulp.watch([folder.src + 'scss/**/*'],  ['sass']);
  gulp.watch([folder.src + 'haml/**/*'],  ['haml']);
  gulp.watch([folder.src + 'js/**/*'],    ['js']);
});
