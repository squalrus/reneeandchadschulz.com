module.exports = function( grunt ){

    // Project Configuration
    grunt.initConfig({
         pkg: grunt.file.readJSON( 'package.json' )

         // Uglify JS
        ,uglify: {
             options: {
                mangle: false
                , beautify: true
             }
            ,dist: {
                files: {
                     'public/js/script.min.js' : ['lib/script.js']
                     ,'public/js/stream.min.js' : ['lib/Stream.js', 'lib/Stream.Tumblr.js']
                }
            }
        }

        // Compile LESS
        ,less: {
            development: {
                options: {
                    compress: true
                }
                ,files: {
                     'public/css/racs.min.css': 'theme/racs.less'
                }
            }
        }

        // Watch Directories / Files
        ,watch: {
             files: ['lib/*.js', 'theme/*.less']
            ,tasks: ['default']
        }
    });

    // Load the plugin that provides the 'uglify' task
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default tasks
    grunt.registerTask( 'default', ['uglify', 'less'] );
};
