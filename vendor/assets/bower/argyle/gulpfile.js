var gulp    = require('gulp'),
    sassdoc = require('gulp-sassdoc');

gulp.task('sassdoc', function() {
  gulp.src('dist/sass')
    .pipe(sassdoc({
      dest: 'docs',
      config: 'sassdoc.json'
    }));
});

gulp.task('watch', function() {
  gulp.watch([ './dist/**/*' ], [ 'sassdoc' ]);
});

gulp.task('dist', [
  'sassdoc'
]);

gulp.task('dev', [
  'dist',
  'watch'
]);
