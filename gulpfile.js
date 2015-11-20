var gulp = require('gulp'),
    ts = require('gulp-typescript')
    postcss = require('gulp-postcss'),
    nodemon = require('gulp-nodemon');

/* PostCSS plugins */ 

var autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss');

var config = {
    serverSrc: 'server',
    clientSrc: 'client/src/app',
    clientOut: 'client/dist/js',
    styleSrc: 'client/styles',
    styleOut: 'client/dist/css'
}

var tsProject = ts.createProject(config.clientSrc + '/tsconfig.json');
 
gulp.task('scripts', function() {
    var tsResult = gulp.src(config.clientSrc + '/**/*.ts')
        .pipe(ts(tsProject));

    tsResult.js.pipe(gulp.dest(config.clientOut))
});

gulp.task('css', function () {
    // TODO: fine-grain the configuration?
    var processors = [
        autoprefixer,
        cssnext,
        precss
    ];

    return gulp.src(config.styleSrc + '/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.styleOut));
});

gulp.task('dev', ['scripts', 'css'], function() {
    nodemon({ 
        script: config.serverSrc + '/index.js',
        ext: 'jade js',
        ignore: ['client']
    })
    .on('restart', function() {
        console.log('Server restarted!')
    });

    gulp.watch(config.clientSrc + '/**/*.ts', ['scripts']);
    gulp.watch(config.styleSrc + '/**/*.css', ['css']);
});