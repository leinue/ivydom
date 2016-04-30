var gulp = require('gulp'),

    minifycss = require('gulp-minify-css'),

    concat = require('gulp-concat'),

    uglify = require('gulp-uglify'),

    rename = require('gulp-rename'),

    del = require('del');

gulp.task('css', function() {

    return gulp.src('src/css/*.css')      //压缩的文件

        .pipe(gulp.dest('build/css'))   //输出文件夹

        .pipe(minifycss());   //执行压缩

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


gulp.task('build', ['clean', 'css', 'js', 'images'], function() {

    gulp.start('css', 'js', 'images');

});

gulp.task('default', ['clean', 'css', 'js', 'images', 'auto'], function() {

    gulp.start('css', 'js', 'images');

});