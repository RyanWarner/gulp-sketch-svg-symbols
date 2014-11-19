var gulp         = require( 'gulp' );
var gutil        = require( 'gulp-util' );

var connect      = require( 'gulp-connect' );
var jade         = require( 'gulp-jade' );

var sketch       = require( 'gulp-sketch' );
var svgSymbols   = require( 'gulp-svg-symbols' );
var rename       = require( 'gulp-rename' );
var runSequence  = require( 'run-sequence' );



// File locations.

var SKETCH_FILE      = 'icons.sketch';
var SVG_OUTPUT_DIR   = './';
var SVG_FILENAME     = 'symbols.svg';



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
    .on( 'error', handleError )
    .pipe( svgSymbols ( {
        templates: [ 'default-svg' ]
    } ) )
    .pipe( rename( SVG_FILENAME ) )
    .pipe( gulp.dest(  SVG_OUTPUT_DIR ) );
} );



gulp.task( 'connect', function(  )
{
    connect.server(
    {
        root: __dirname,
        hostname: '0.0.0.0',
        livereload: true
    } );
} );

gulp.task( 'jade', function( )
{
    return gulp.src( 'index.jade' )
        .pipe( jade( { pretty: true } ) )
        .on( 'error', handleError )
        .pipe( gulp.dest( __dirname ) );
} );



gulp.task( 'default', function(  )
{
    runSequence(
        [
            'jade'
        ],
        'connect'
    );   
} );
