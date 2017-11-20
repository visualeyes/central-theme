var gulp = require("gulp"),
    rimraf = require("gulp-rimraf"),
    less = require('gulp-less'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    LessCleanCss = require('less-plugin-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var cleanCss = new LessCleanCss({advanced: true});

gulp.task('less', function () {
    return gulp
        .src('./less/theme.less')
        .pipe(sourcemaps.init())
        .pipe(less({ plugins: [autoprefix, cleanCss] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function () {
    return gulp
        .src('./node_modules/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));

})

gulp.task('js', function () {
    return gulp
        .src('./node_modules/bootstrap/dist/js/*.js')
        .pipe(gulp.dest('./dist/js'));

})

gulp.task('clean', function () {
	return gulp
		.src(['./dist'])
		.pipe(rimraf());
});

gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less']);
});

gulp.task('serve', ['less', 'js', 'fonts'], function() {
    browserSync.init({ server: { baseDir: "./" } });
    gulp.watch(['./less/*.less', ], ['less']);
    gulp.watch(['./index.html', './dist/css/theme.css']).on("change", browserSync.reload);
});

gulp.task('default', ['less', 'fonts', 'js']);
    