var e = require('eslint'),
	gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	gulpUtil = require('gulp-util'),
	eslint = require('gulp-eslint'),
	webpack = require('webpack'),
	reactify = require('reactify'),
	browserSync = require('browser-sync').create(),
	minimist = require('minimist'),
	runSequence = require('run-sequence').use(gulp);


var argv = minimist(process.argv.slice(2));

var watch = false;

var buildDir = 'build';

gulp.task('lint', function() {  
	return gulp.src('app/**/*.{js,jsx}')
	    .pipe(eslint())
	    .pipe(eslint.format())
	    .pipe(eslint.failOnError());
});

gulp.task('bundle', function(callback){
	var config = require('./webpack.config.js'),
		bundler = webpack(config);

	var verbose = !!argv.verbose;
  	var bundlerRunCount = 0;

  	function bundle(err, stats) {
	    if (err) {
	      throw new gulpUtil.PluginError('webpack', err);
	    }

	    console.log(stats.toString({
	      colors: gulpUtil.colors.supportsColor,
	      hash: verbose,
	      version: verbose,
	      timings: verbose,
	      chunks: verbose,
	      chunkModules: verbose,
	      cached: verbose,
	      cachedAssets: verbose
	    }));

	    if (++bundlerRunCount === (watch ? config.length : 1)) {
	      return callback();
	    }
  	}

  	if (watch) {
    	bundler.watch(200, bundle);
  	} else {
    	bundler.run(bundle);
  	}
});

gulp.task('bundle:watch', function(callback){
	gulp.watch([
		'app/**/*.{js,jsx}'
	], ['bundle']);
	callback();
});


gulp.task('serve', function() {
	connect.server({
    	root: buildDir,
    	port: 5000,
    	livereload: true
  	});
});

gulp.task('browsersync', function(callback){
	browserSync.init({
		logPrefix: 'VRT',
		notify: false,
		https: false,
		proxy: 'localhost:5000',      
	}, callback);

	process.on('exit', function(){
		browserSync.exit()
	});
});

gulp.task('sass', function(){
	return gulp.src('app/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(buildDir+'/styles'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('sass:watch', function(callback){
	gulp.watch('app/styles/**/*.scss', ['sass']);
	callback();
});

gulp.task('copyviews', function(){
	return gulp.src('app/index.html')
		.pipe(gulp.dest(buildDir))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('copyassets', function(){
	return gulp.src('app/public/**')
		.pipe(gulp.dest(buildDir+'/public'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function(callback){
	gulp.watch([
		'app/public/**',
		'app/index.html'
	], ['copyassets', 'copyviews']);
	callback();
});

gulp.task('default', function(){
	runSequence('lint', ['watch', 'bundle', 'bundle:watch', 'sass', 'sass:watch'], ['copyassets', 'copyviews'], 'serve', 'browsersync');
});


