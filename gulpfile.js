var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var surge = require('gulp-surge');

// gulp.task('surge', function() {
// 	return surge({
//     project: 'dist',            // Path to your static build directory
//     domain: 'aaronreq.surge.sh'  // Your domain or Surge subdomain
//   })

// })

gulp.task('test', function() {
	console.log('Gulp moving fast, you need to cut it');
	console.log(sources.script);
});

/*
 *  CUSTOM COMPILE
 */



var sources = {
  jade: './*.jade',
  // root: ['CNAME', 'robots.txt', 'favicon.ico'],
  style: 'css/*.scss',
  script: 'script/**/*.js',
  // images: ['assets/images/**/*.png','assets/images/**/*.jpg','assets/images/**/*.gif','assets/images/**/*.jpeg']
}

var destination = {
  script: 'dist/script',
  style:  'dist/css',
  // img:    'dist/assets/images',
  public: 'dist',
  surge:  'granny-smith.surge.sh'
}

// Jade Compile
gulp.task('compile-jade', function(event) {
  return gulp.src(sources.jade)
    .pipe(jade({
    	pretty: true
    }))
    .pipe(gulp.dest(destination.public))
});

 // Sass Compile
gulp.task('compile-style', function() {
  return gulp.src(sources.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destination.style));
});

// Script Compile
gulp.task('compile-scripts', function() {
  return gulp.src(sources.script)
    .pipe(gulp.dest(destination.script));
});

// Other compile
gulp.task('compile-other', function() {
  return gulp.src(sources.root)
    .pipe(gulp.dest(destination.public));
});

gulp.task('compile', ['compile-jade', 'compile-style', 'compile-scripts' ], function() {
	console.log('compile complete');
})


/*
 * Surge Deploy
 */
gulp.task('deploy', ['compile'], function() {
	return surge({
    project: destination.public,  // Path to your static build directory
    domain:  destination.surge    // Your domain or Surge subdomain
  })
})




