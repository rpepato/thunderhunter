var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha');

gulp.task('test', function() {
  return gulp.src('test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
})

gulp.task('lint', function () {
    return gulp.src(['src/helpers/*.js', 'test/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint', 'test'], function () {
    // This will only run if the lint task is successful...
});
