/**
 * Gulp 自动化工具
 * Author   ：yfgeek
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');

// 压缩 js 文件
gulp.task('script', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
});

// // 压缩 js 文件
// gulp.task('i18n', function() {
//     gulp.src('src/i18n/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('docs/i18n'))
// });

// sass预编译
gulp.task('sass', function () {
  return gulp.src('src/sass/dreamyadmin/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css/dreamyadmin'))
});

// 压缩 css 文件
gulp.task('css', function () {
    gulp.src('src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('docs/css'))
});

// 删除多余代码
gulp.task('uncss', function () {
    return gulp.src(['docs/css/blue.css','docs/css/style.css'])
        .pipe(uncss({
            html: ['docs/index.html']
        }))
        .pipe(gulp.dest('docs/css'));
});

// 压缩html
gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true,removeComments: true}))
    .pipe(gulp.dest('docs'));
});

//压缩图片
gulp.task('img', function () {
    gulp.src(['src/images/**/*','src/images/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('docs/images'))
});

// HTML组合分离的css、js
gulp.task('efhtml', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('docs'));
});

// 自动化
gulp.task('auto', function () {
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/sass/*.css', ['css']);
    gulp.watch('src/css/*.css', ['sass']);
});


gulp.task('default', ['script','sass','html','css']);
