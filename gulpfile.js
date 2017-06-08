var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

// Скрипты проекта
gulp.task('scripts', function() {
	return gulp.src([
		'assets/app/libs/jquery/dist/jquery.min.js',
		'assets/app/libs/owl.carousel/dist/owl.carousel.min.js',
		'assets/app/libs/equalHeights/equalheights.js',
		'assets/app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'assets/app/libs/jquery.maskedinput.min.js',
		'assets/app/js/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "http://ut.site/modx-2.5.5-pl/manager",
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('assets/app/sass/**/*.scss')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('assets/app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
	gulp.watch('assets/app/sass/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'assets/app/js/common.js'], ['scripts']);
	gulp.watch('assets/app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('assets/app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function() {

	var buildFiles = gulp.src([
		'assets/app/*.html',
		'assets/app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'assets/app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'assets/app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'assets/app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);

