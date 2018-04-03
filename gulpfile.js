var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssMin = require('gulp-cssmin');
var htmlMin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-html-replace');
var browserSync = require('browser-sync');
//初始化gulp：
// 在执行default之前
gulp.task('default', ['less', 'html', 'js-min', 'zepto-concat', 'copy'], function () {

});

//构建需求
//1、less打包；
//1.1、解析less； gulp-less
//1.2、加私有前缀； gulp-autoprefixer
//1.3、压缩；	gulp-cssmin
//1.4输出dist中的css目录
gulp.task('less', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 100 versions']
        }))
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css'))
        // 让文件同步到浏览器
        // less的导入文件没有打包进去
        // 是gulp-less 4.0.0版本的bug
        // 下载3.5.0版本
        // .pipe(browserSync.reload({'stream':true}));或者：
        .pipe(browserSync.stream());
});


// html打包
// 2替换路径


gulp.task('html', function () {
    gulp.src('src/**/*.html') //匹配所有的html

    // 替换路径：
        .pipe(replace({
            'css': 'css/index.css',
            'js': "assets/zepto/all.js"
        }))
        .pipe(htmlMin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true

        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});


// 3、js打包
gulp.task('js', ['js-min', 'zepto-concat']);
gulp.task('js-min', function () {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// 合并zepto的所有模块：
gulp.task('zepto-concat', function () {
    // 合并的时候，会默认按照文件的顺序打包，要注意文件的依赖关系
    gulp.src(['src/assets/zepto/zepto.min.js', 'src/assets/zepto/fx.js', 'src/assets/zepto/selector.js', 'src/assets/zepto/touch.js'])
    // 合并文件并且设置文件名称：
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/zepto'))
});

// 4、拷贝任务：images文件内的图片
gulp.task('copy', function () {
    gulp.src('src/images/**')
        .pipe(gulp.dest('dist/images'));
    gulp.src('src/fonts.**')
        .pipe(gulp.dest('dist/fonts'));

});

// 编程过程中自动打包
// 只要less文件改变，就执行；less任务 参数2：任务
gulp.watch('src/less/**/*.less', ['less']);
// html结构改变，就执行html任务
gulp.watch('src/**/*.html', ['html']);
// js文件改变执行js任务
gulp.watch('src/js/**/*.js', ['js']);

// 6编码过程中要求服务器重载
// 6.1启动一个服务
browserSync({
    server: {
        baseDir: 'dist'
    }
});
