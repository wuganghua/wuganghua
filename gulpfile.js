// 引入 gulp
var gulp = require('gulp');

// 引入组件

var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var minifyCSS = require('gulp-minify-css')


// 编译less
gulp.task('less', function() {
    gulp.src('src/css/*.less')
        .pipe(less())
		.pipe(minifyCSS())
        .pipe(gulp.dest('./dest/css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('jquery.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dest/js'));
});

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./dest/js/*.js', './dest/css/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./dest'));
});
// 默认任务
gulp.task('default', function(){
    gulp.run( 'less', 'scripts','inject');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run( 'less', 'scripts');
    });
    gulp.watch('./css/*.less', function(){
        gulp.run( 'less', 'scripts');
    });
});