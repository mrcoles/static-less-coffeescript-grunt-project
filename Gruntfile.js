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
        'grunt-usemin',
        'grunt-filerev'
    ].forEach(function(task) { grunt.loadNpmTasks(task); });


    // setup init config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                src: [
                    'dist/*',

                    // funny dance to keep old versioned dist/css/*.pkg.*.css
                    '!dist/css/**',
                    'dist/css/*',
                    '!dist/css/*.pkg.*.css',

                    // funny dance to keep old versioned dist/css/*.pkg.*.js
                    '!dist/js/**',
                    'dist/js/*',
                    '!dist/js/*.pkg.*.js'
                ]
            }
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
                        'ico/**',
                        'img/**'
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
                    // TODO - automatically support multiple less files
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
            html: [
                // you can enter other html files here
                'dist/index.html'
            ]
        },
        usemin: {
            html: [
                // you can enter other html files here
                'dist/index.html'
            ],
            options: {
                dirs: ['dist/']
            }
        },
        filerev: {
            files: {
                src: [
                    'dist/css/*.pkg.css',
                    'dist/js/*.pkg.js'
                ]
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
                },
                ignores: [
                    // enter paths to ignore here, e.g., 'src/js/jquery.js'
                ]
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
                                   'filerev',
                                   'usemin']);
};
