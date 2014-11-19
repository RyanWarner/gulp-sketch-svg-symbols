var gulp         = require( 'gulp' );
var gutil        = require( 'gulp-util' );

var sketch       = require( 'gulp-sketch' );
var svgSymbols   = require( 'gulp-svg-symbols' );



// File locations.

var SKETCH_FILE = 'icons.sketch';



// Error handler.

function handleError( err )
{
    console.log( err.toString(  ) );
    gutil.beep;
    this.emit( 'end' );
}



// Tasks.

gulp.task( 'symbols', function(  )
{
    gulp.src( SKETCH_FILE )
    .pipe( sketch(
    {
        export: 'artboards',
        formats: 'svg'
    } ) )
    .pipe( svgSymbols( {
        templates: [ 'default-svg' ]
    } ) )
    .pipe( gulp.dest(  './images/' ) );
} );
