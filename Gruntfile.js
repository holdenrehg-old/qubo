module.exports = function(grunt) {
    var sh = require('execSync');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'test/**/*.js', 'src/**/*.js', 'public/javascripts/**/*.js', '!public/javascripts/bundle.js']
        },
        jsdoc: {
            dist: {
                src: ['src/**/*.js', 'public/javascripts/**/*.js', '!public/javascripts/bundle.js'],
                options: {
                    destination: 'doc'
                }
            }
        },  
        mochaTest: {
            test: {
                src: ['test/**/*.js'],
                options: {
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['server']);
    grunt.registerTask('build', ['vendor:install', 'vendor:update']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);

    grunt.registerTask('server', 'Start watchify, sass watch, and nodemon', function() {
        sh.run('watchify --debug -t hbsfy public/javascripts/bootstrap.js -o public/javascripts/bundle.js &');
        sh.run('sass --watch public/stylesheets &');
        sh.run('nodemon server');
    });
    grunt.registerTask('vendor', 'Perform task on dependencies', function(action) {
        if (action === undefined) {
            grunt.log.error('Please provide argument to vendor task');
            return;
        }

        sh.run('npm ' + action);
        sh.run('bower ' + action);
    });
};
