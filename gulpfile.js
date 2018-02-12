
// Dependencies
var
gulp            = require('gulp'),
gutil           = require('gulp-util'),
concat          = require('gulp-concat'),
uglify          = require('gulp-uglify'),
sass            = require('gulp-sass'),
sourceMaps      = require('gulp-sourcemaps'),
imagemin        = require('gulp-imagemin'),
minifyCSS       = require('gulp-minify-css'),
browserSync     = require('browser-sync'),
autoprefixer    = require('gulp-autoprefixer'),
gulpSequence    = require('gulp-sequence').use(gulp),
shell           = require('gulp-shell'),
plumber         = require('gulp-plumber'),
ghPages         = require('gulp-gh-pages'),
order           = require("gulp-order"),
fileinclude     = require('gulp-file-include'),
clean           = require('gulp-clean');

// Configurations
var config = {
  // Supported browser versions
  autoPrefixBrowserList : ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
  // Directories
  baseDir: "source/",
  serveDir: ".serve/",
  jekyllDir: "./",
  distDir: "dist/",
  imagesDir: "images/",
  scriptsDir: "scripts/",
  scriptsMain: "main.js",
  stylesDir: "styles/",
  stylesMain: "styles.css",
  fontsDir: "fonts/",
  partialsDir: "partials/",
  // Include Vars
  include: {
    selected : null
  }
}

// Browsersync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: config.serveDir
    },
    options: {
      reloadDelay: 250
    },
    notify: false
  });
});

// Compressing images & handle SVG files
gulp.task('images-deploy', function(tmp) {
  gulp.src([config.baseDir + config.imagesDir + '**/*.jpg', config.baseDir + config.imagesDir + '**/*.png'])
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
  .pipe(gulp.dest(config.distDir + config.imagesDir));
  gulp.src([config.baseDir + config.imagesDir + '**/*.svg', config.baseDir + config.imagesDir + '**/*.gif'])
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(gulp.dest(config.distDir + config.imagesDir));
});

// Compressing images for deployment
gulp.task('images', function() {
  gulp.src([config.baseDir + config.imagesDir + '**/*'])
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(gulp.dest(config.serveDir + config.imagesDir));
});

// Copying fonts
gulp.task('fonts', function() {
  gulp.src(config.baseDir + config.fontsDir + '**/*')
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(gulp.dest(config.serveDir + config.fontsDir));
});

// Copying fonts
gulp.task('fonts-deploy', function() {
  gulp.src(config.baseDir + config.fontsDir + '**/*')
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(gulp.dest(config.distDir + config.fontsDir));
});

// Compiling Javascripts
gulp.task('scripts', function() {
  //this is where our dev JS scripts are
  return gulp.src([config.baseDir + config.scriptsDir + 'src/_includes/**/*.js', config.baseDir + config.scriptsDir + 'src/**/*.js'])
  .pipe(order([
    'vendor/**/*.js',
    '**/*.js'
  ]))
  .pipe(plumber())
  .pipe(concat(config.scriptsMain))
  .on('error', gutil.log)
  .pipe(gulp.dest(config.scriptsDir))
  .pipe(browserSync.reload({stream: true}));
});

// Compiling Javascripts for deployment
gulp.task('scripts-deploy', function() {
  return gulp.src([config.baseDir + config.scriptsDir + 'src/_includes/**/*.js', config.baseDir + config.scriptsDir + 'src/**/*.js'])
  .pipe(order([
    'vendor/**/*.js',
    '**/*.js'
  ]))
  .pipe(plumber())
  .pipe(concat(config.scriptsMain))
  .pipe(uglify())
  .pipe(gulp.dest(config.scriptsDir));
});

// Compiling our SCSS files
gulp.task('styles', function() {

  //the initializer / master SCSS file, which will just be a file that imports everything
  return gulp.src(config.baseDir + config.stylesDir + 'scss/init.scss')
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  //get sourceMaps ready
  .pipe(sourceMaps.init())
  //include SCSS and list every "include" folder
  .pipe(sass({
    errLogToConsole: true,
    includePaths: [
      config.baseDir + config.stylesDir + 'scss/'
    ]
  }))
  .pipe(autoprefixer({
    browsers: config.autoPrefixBrowserList,
    cascade:  true
  }))
  //catch errors
  .on('error', gutil.log)
  //the final filename of our combined css file
  .pipe(concat(config.stylesMain))
  //get our sources via sourceMaps
  .pipe(sourceMaps.write())
  //where to save our final, compressed css file
  .pipe(gulp.dest(config.stylesDir))
  //.pipe(gulp.dest(config.serveDir + config.stylesDir))
  //notify browserSync to refresh
  .pipe(browserSync.reload({stream: true}));
});

// Compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
  //the initializer / master SCSS file, which will just be a file that imports everything
  return gulp.src(config.baseDir + config.stylesDir + 'scss/init.scss')
  .pipe(plumber())
  //include SCSS includes folder
  .pipe(sass({
    includePaths: [
      config.baseDir + config.stylesDir + 'scss/'
    ]
  }))
  .pipe(autoprefixer({
    browsers: config.autoPrefixBrowserList,
    cascade:  true
  }))
  //the final filename of our combined css file
  .pipe(concat(config.stylesMain))
  .pipe(minifyCSS())
  //where to save our final, compressed css file
  .pipe(gulp.dest(config.stylesDir));
});

// Watching all HTML files
gulp.task('html', function() {
  //watch any and all HTML files and refresh when something changes
  return gulp.src(config.baseDir + '*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: config.baseDir,
    context: config.include
  }))
  .pipe(plumber())
  .pipe(gulp.dest(config.serveDir))
  .pipe(browserSync.reload({stream: true}))
  //catch errors
  .on('error', gutil.log);
});

// Migrating over all HTML files for deployment
gulp.task('html-deploy', function() {
  //grab everything, which should include htaccess, robots, etc
  gulp.src([config.baseDir + '*', '!' + config.baseDir + '*.html', '!' + config.baseDir + config.partialsDir])
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(gulp.dest(config.distDir));

  gulp.src(config.baseDir + '*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: config.baseDir,
    context: config.include
  }))
  .pipe(plumber())
  .pipe(gulp.dest(config.distDir))

  //grab any hidden files too
  gulp.src(config.baseDir + '.*')
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(gulp.dest(config.distDir));

  //grab all of the styles
  gulp.src([config.baseDir + config.stylesDir + '*.css', '!' + config.baseDir + config.stylesDir + config.stylesMain])
  //prevent pipe breaking caused by errors from gulp plugins
  .pipe(plumber())
  .pipe(gulp.dest(config.distDir + config.stylesDir));
});

// Cleans our dist directory in case things got deleted
gulp.task('clean', function() {
  return gulp.src(config.distDir, {read: false})
  .pipe(clean());
});

// Create folders using shell
gulp.task('scaffold', function() {
  return shell.task([
    'mkdir ' + config.distDir,
    'mkdir ' + config.distDir + config.fontsDir,
    'mkdir ' + config.distDir + config.imagesDir,
    'mkdir ' + config.distDir + config.scriptsDir,
    'mkdir ' + config.distDir + config.stylesDir
  ]
);
});

// Watcher
gulp.task('default', ['fonts', 'scripts', 'styles', 'html', 'images', 'browserSync'], function() {
  //a list of watchers, so it will watch all of the following files waiting for changes
  gulp.watch(config.baseDir + config.scriptsDir + 'src/**', ['scripts']);
  gulp.watch(config.baseDir + config.stylesDir + 'scss/**', ['styles']);
  gulp.watch(config.baseDir + config.imagesDir + '**', ['images']);
  gulp.watch(config.baseDir + '**/*.html', ['html']);
});

// Compile
gulp.task('compile', gulpSequence('clean', 'scaffold', ['scripts-deploy', 'styles-deploy', 'images-deploy', 'fonts-deploy', 'html-deploy']));

// Github ghPages
gulp.task('stage', function() {

  return gulp.src(config.distDir + '**/*')
  .pipe(ghPages());
});

// Deployment
gulp.task('deploy', ['compile']);
