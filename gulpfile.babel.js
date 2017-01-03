import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import ghPages from 'gulp-gh-pages';
import dirTree from './lib/dirTree';
import fs from 'fs';

const paths = {
  bundle: 'app.js',
  srcJsx: 'src/Index.js',
  srcCss: 'src/**/*.scss',
  srcImg: 'src/images/**',
  srcLint: ['src/**/*.js', 'test/**/*.js'],
  srcFonts: 'src/fonts/*',
  srcData: 'src/data/*',
  dist: './dist',
  distJs: 'dist/js',
  distCss: 'dist/styles',
  distImg: 'dist/images',
  distFonts: 'dist/fonts',
  distData: 'dist/js/data',
  distDeploy: './dist/**/*'
};

const customOpts = {
  entries: [paths.srcJsx],
  debug: true
};

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watchify', () => {
  let bundler = watchify(browserify(opts));

  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('createDirTree', () => {
  fs.writeFile('./src/routes/directory-tree.json', JSON.stringify(dirTree('./src/data')), (err, data) => {
    if(err) {
      return console.log(err);
    }
    console.log(data);
  })
});

gulp.task('browserify', () => {
  browserify(paths.srcJsx, {debug: true})
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
});

// gulp.task('styles', () => {
//   gulp.src(paths.srcCss)
//   .pipe(sourcemaps.init())
//   .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
//   .pipe(sourcemaps.write('.'))
//   .pipe(rename({extname: ".css"}))
//   .pipe(gulp.dest(paths.dist))
//   .pipe(reload({stream: true}));
// });

gulp.task('sass', () => { // Declares the task "sass"
  gulp.src('./src/styles/*.scss') // Tells gulp what the source folder is and tells it to look at ALL SCSS files
  .pipe(sass().on('error', sass.logError)) // Compiles SCSS into CSS. It also handles any errors that come about
  .pipe(gulp.dest('./dist/styles')) // Tells gulp where to put the CSS compiled from SCSS
  .pipe(reload({stream: true})); // Reloads the browser! The browser then uses the newly compiled CSS styles that you edited the SCSS for!
});

gulp.task('data', () =>{
  gulp.src(paths.srcData)
    .pipe(gulp.dest(paths.distData))
    .pipe(reload({stream: true}));
});

gulp.task('htmlReplace', () => {
  gulp.src('index.html')
  .pipe(htmlReplace({css: 'styles/foundation.css', js: 'js/app.js'}))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.distImg));
});

gulp.task('fonts', () => {
  gulp.src(paths.srcFonts)
    .pipe(gulp.dest(paths.distFonts));
});

gulp.task('lint', () => {
  gulp.src(paths.srcLint)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['sass']);
  gulp.watch(paths.srcJsx, ['lint']);
  gulp.watch(paths.data, ['createDirTree']);
});

gulp.task('deploy', function() {
  return gulp.src(paths.distDeploy)
    .pipe(ghPages());
});

gulp.task('default', cb => { // When running 'gulp' in command line, it runs the listed tasks in sequence. This is meant for your dev environment
  runSequence('clean', ['createDirTree', 'browserSync', 'watchTask', 'watchify', 'sass', 'data', 'fonts', 'lint', 'images'], cb);
});

gulp.task('build', cb => { // When running 'gulp build' in command line, it runs the listed tasks in sequence. This is meant for your build
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'sass', 'data', 'htmlReplace', 'fonts', 'images'], cb);
});
