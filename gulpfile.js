var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync').create(), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    spritesmith = require('gulp.spritesmith'), // Подключаем библиотеку для создания png-спрайтов
    svgstore = require('gulp-svgstore'),//// Подключаем библиотеку для объединения SVG в один файл
    svgmin = require('gulp-svgmin'),//Подключаем библиотеку для минификации SVG
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    extender = require('gulp-html-extend'),//Подключаем бибилиотеку для склейки html-файлов
    sourcemaps = require('gulp-sourcemaps'),//Подключаем плагин, записывающий карту источника в исходный файл
    rimraf = require('rimraf'),//Очищает указанные исходники
    plumber = require('gulp-plumber');//Подключаем плагин, который не останавливает задачи от остановки во время их выполнения при возникновении ошибки

var postcss = require('gulp-postcss'),//Блиотека-парсер стилей для работы с postcss-плагинами
    autoprefixer = require('autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    cssnano = require('cssnano'),//postcss-плагин, для минификации CSS кода, идущего на продакшен.
    pxtorem = require('postcss-pxtorem'),//postcss-плагин, для перевода px в rem, идущего на продакшен.
    pxtoem = require('postcss-px-to-em'),//postcss-плагин, для перевода px в em, идущего на продакшен.
    short = require('postcss-short'),
    stylefmt = require('stylefmt'),
    assets = require('postcss-assets'),
    shortspacing = require('postcss-short-spacing'),
    focus = require('postcss-focus'),//postcss-плагин, делающие стили :hover и :focus одинаковыми.
    sorting = require('postcss-sorting'),
    fontmagic = require('postcss-font-magician'),
    fixes = require('postcss-fixes');

gulp.task('css-libs', function () { // Создаем таск css-libs
    var processors = [
        cssnano
    ]
    return gulp.src([
        'app/libs/**/*.css'
    ]) // Берем источник
        .pipe(postcss(processors))// сжымаем
        .pipe(concat('libs.min.css'))// объеденяем в файл
        .pipe(gulp.dest('./puplic/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.stream({})); // Обновляем CSS на странице при изменении
});

gulp.task('sass', function () { // Создаем таск Sass
    var processors = [// подключаем постпроцессоры в массиве
        assets,
        short,
        fontmagic,
        fixes,
        autoprefixer(['last 25 versions', '> 5%', 'ie 8', 'ie 7', 'ie 9', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'], {
            cascade: true
        }),
        sorting(),
        stylefmt,
        cssnano
    ];
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: 'css-source'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./puplic/css'))
        .pipe(browserSync.stream({}));
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync.init({ // Выполняем browserSync
        server: {
            baseDir: "./puplic"
        }
       /* ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        notify: false // Отключаем уведомления*/
    });
});

gulp.task('vendor', ['clean'], function () {
    return gulp.src(['app/js-libs/jquery-2.1.3.min.js',
            'app/js-libs/jquery-ui.min.js',
            'app/js-libs/jquery.fancybox.js',
            'app/js-libs/slick.js',
            'app/js-libs/countdown.js'])// Берем все необходимые библиотеки
        .pipe(plumber())
        .pipe(concat('vendor.js'))// Собираем их в кучу в новом файле vendor.js
        .pipe(rename({}))
        /*.pipe(uglify()) // Сжимаем JS файл*/
        .pipe(plumber.stop())
        .pipe(gulp.dest('./puplic/js'));// Выгружаем в папку js
});

gulp.task('compress', ['clean'], function () {// Создаем таск compress
    return gulp.src('app/js/*.js')// Берем все необходимые библиотеки
        .pipe(plumber())
        .pipe(concat('script.js'))// Собираем их в кучу в новом файле script.js
        .pipe(rename({
            suffix: ".min",// Добавляем суффикс .min
            extname: ".js"// Добавляем окончание .js
        }))
        // .pipe(uglify()) // Сжимаем JS файл
        .pipe(plumber.stop())
        .pipe(gulp.dest('./puplic/js'))// Выгружаем в папку js
        .pipe(browserSync.stream({}));

});

gulp.task("clean", function (cb) {
    rimraf('./puplic/js/script.min.js', cb);
});

gulp.task('extend-pages', function () {
    gulp.src('./app/html/pages/*.html')
        .pipe(extender({annotations: true, verbose: false})) // default options
        .pipe(gulp.dest('./puplic'))
        .pipe(browserSync.stream({}));
});

gulp.task('extend-blocks', function () {
    gulp.src('./app/html/*.html')
        .pipe(extender({annotations: true, verbose: false})) // default options
        .pipe(gulp.dest('./puplic'))
        .pipe(browserSync.stream({}));
});

gulp.task('watch', ['compress', 'extend-pages', 'css-libs', 'img', 'sass'], function () {
    gulp.watch('app/libs/**/*', ['css-libs']); // Наблюдение за папкой libs
    gulp.watch('app/img/**/*', ['img']);// Наблюдение за папкой img
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch(['app/html/**/*.html'], ['extend-pages']);// Наблюдение за HTML-файлами в папке html
    gulp.watch('app/js/**/*.js', ['compress']); // Наблюдение за js-файлами
});


gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./puplic/img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('default', ['watch', 'browser-sync']);
