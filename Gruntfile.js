module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                //separator: ';'
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | https://github.com/bkuhl/angular-form-ui */\n'
            },
            js: {
                src: ['src/angular-form-ui.js', 'src/directives/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
            css: {
                src: 'src/**/*.css',
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                report: 'min',
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | https://github.com/bkuhl/angular-form-ui */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        karma : {
            spec: {
                configFile : 'karma.conf.js'
            }
        },
        copy: {
            images: {
                expand: true,
                src: 'src/**/images/*',
                dest: 'dist/images/',
                flatten: true
            }
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/**/*.js']
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);
    grunt.registerTask('test', ['jshint', 'concat', 'uglify', 'copy', 'karma']);
};