var gulp = require("gulp"),
    rimraf = require("gulp-rimraf"),
    less = require('gulp-less'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    LessCleanCss = require('less-plugin-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('variables', () => gulp
    .src('./node_modules/bootstrap/less/variables.less')
    .pipe(gulp.dest('./less/bootstrap')))

gulp.task('less', ['variables'], () => gulp
    .src('./less/theme.less')
    .pipe(sourcemaps.init())
    .pipe(less({ plugins: [
        new LessAutoprefix({ browsers: ['last 2 versions'] }), 
        new LessCleanCss({advanced: true}),
    ] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css')));

gulp.task('fonts', () => gulp
    .src('./node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts')))

gulp.task('assets', () => gulp
    .src('./assets/*.*')
    .pipe(gulp.dest('./dist/assets')))

gulp.task('js', () => gulp
    .src('./node_modules/bootstrap/dist/js/*.js')
    .pipe(gulp.dest('./dist/js')));

gulp.task('clean', () => gulp
    .src(['./dist'])
    .pipe(rimraf()));

gulp.task('watch', () => gulp.watch('./less/*.less', ['less']));

gulp.task('serve', ['default'], function() {
    browserSync.init({ server: { baseDir: "./" }, port: 3001 });
    gulp.watch(['./less/*.less', ], ['less']);
    gulp.watch(['./index.html', './dist/css/theme.css']).on("change", browserSync.reload);
});

gulp.task('default', [
    'less',
    'fonts',
    'js',
    'assets'
]);
    