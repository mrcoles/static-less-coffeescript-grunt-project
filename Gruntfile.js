module.exports = function(grunt) {

    // load tasks
    [
        'grunt-contrib-jshint',
        'grunt-contrib-qunit',
        'grunt-contrib-watch',
        'grunt-contrib-clean',
        'grunt-contrib-copy',
        'grunt-contrib-concat',
        'grunt-contrib-uglify',
        'grunt-contrib-cssmin',
        'grunt-contrib-concat',
        'grunt-contrib-less',
        'grunt-contrib-coffee',
        'grunt-usemin'
    ].forEach(function(task) { grunt.loadNpmTasks(task); });


    // setup init config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: [
                        '*',
                        'css/**',
                        'js/**',
                        'ico/**'
                    ],
                    filter: 'isFile'
                }]
            }
        },
        less: {
            css: {
                options: {
                    paths: ["src/less"]
                },
                files: {
                    // TODO - support multiple less files
                    "src/css/style.css": "src/less/style.less"
                }
            }
        },
        coffee: {
            glob_to_multiple: {
                expand: true,
                //flatten: true,
                cwd: 'src/coffee',
                src: ['**/*.coffee'],
                dest: 'src/js',
                ext: '.js'
            }
        },
        useminPrepare: {
            html: ['dist/index.html']
        },
        usemin: {
            html: ['dist/index.html'],
            options: {
                dirs: ['dist/']
            }
        },
        // TODO - support qunit
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            coffee: {
                files: ['src/**/*.coffee'],
                tasks: ['coffee', 'jshint']
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['less', 'coffee', 'jshint', 'clean', 'copy',
                                   'useminPrepare',
                                   'concat', 'uglify', 'cssmin',
                                   'usemin']);
};
