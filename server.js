var express      = require( 'express' )
    ,http        = require( 'http' )
    ,path        = require( 'path' )
    ,app         = express();

// Environment Settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Middleware
app.use( express.favicon() );
app.use( express.bodyParser() );
app.use( express.compress() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Routing
app.get( '/', function( req, res ){
    res.render( 'index' );
});

app.get( '/blog', function( req, res ){
    res.render( 'blog' );
});

app.get('/rsvp', function (req, res ) {
    res.render('rsvp');
});

// Create Server
http.createServer( app ).listen( app.get( 'port' ), function( ){
    console.log( 'Server listening on port ' + app.get( 'port' ) );
});