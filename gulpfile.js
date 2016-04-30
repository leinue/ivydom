var gulp = require('gulp'),

    minifycss = require('gulp-minify-css'),

    concat = require('gulp-concat'),

    uglify = require('gulp-uglify'),

    rename = require('gulp-rename'),

    del = require('del');

var htmlmin = require('gulp-htmlmin');

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
});

gulp.task('css', function () {
    var cssSrc = './src/css/*.css',
        cssDst = './build/css';

    gulp.src(cssSrc)
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

gulp.task('js', function() {

    return gulp.src('src/js/*.js')

        .pipe(concat('main.js'))    //合并所有js到main.js

        .pipe(gulp.dest('build/js'))    //输出main.js到文件夹

        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名

        .pipe(uglify())    //压缩

        .pipe(gulp.dest('build/js'));  //输出

});

gulp.task('images', function() {

    return gulp.src('src/imgs/*')

        .pipe(gulp.dest('build/imgs'));  //输出

});

gulp.task('clean', function(cb) {

    del(['build/css', 'build/js', 'build/imgs'], cb)

});

gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('src/js/*.js', ['js']);
})


gulp.task('build', ['clean', 'css', 'js', 'images', 'html'], function() {

    gulp.start('css', 'js', 'images');

});

gulp.task('default', ['clean', 'css', 'js', 'images', 'html', 'auto'], function() {

    gulp.start('css', 'js', 'images');

});