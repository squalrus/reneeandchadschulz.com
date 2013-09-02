var express      = require( 'express' )
    ,http        = require( 'http' )
    ,path        = require( 'path' )
    ,app         = express(),
    nconf         = require( 'nconf' ),
    mail        = require("nodemailer");

// Environment Settings
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Middleware
app.use( express.favicon() );
app.use( express.bodyParser() );
app.use( express.compress() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Settings
nconf.env().file({ file: 'config.json' });

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

app.post('/send', function (req, res) {
    var smtp,
        opts;

    smtp = mail.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: nconf.get('EMAIL_FROM'),
            pass: nconf.get('EMAIL_FROM_PASS')
        }
    });

    opts = {
        from: "RSVP <rsvp@reneeandchadschulz.com>", // sender address
        to: nconf.get('EMAIL_TO'),                  // list of receivers
        subject: "New Wedding RSVP!",               // Subject line
        text: req.body.rsvp,                        // plaintext body
        html: req.body.rsvp                         // html body
    };

    smtp.sendMail(opts, function (err, res) {
        if (err) {
            console.log(error);
        } else {
            console.log("Message sent");
        }
        smtp.close();
    });

    res.redirect("/");
});

// Create Server
http.createServer( app ).listen( app.get( 'port' ), function( ){
    console.log( 'Server listening on port ' + app.get( 'port' ) );
});