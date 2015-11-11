var gulp = require('gulp');
var ts = require('gulp-typescript');
 
var config = {
    clientSrc: 'client/src/app',
    clientOut: 'client/dist'
}

var tsProject = ts.createProject(config.clientSrc + '/tsconfig.json');
 
gulp.task('scripts', function() {
    var tsResult = gulp.src(config.clientSrc + '/**/*.ts')
        .pipe(ts(tsProject));

    tsResult.js.pipe(gulp.dest(config.clientOut))
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch(config.clientSrc + '/**/*.ts', ['scripts']);
});