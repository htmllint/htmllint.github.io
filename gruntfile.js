module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('build', [
        'jade',
        'less'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect'
    ]);

    grunt.initConfig({
        connect: {
            dev: {
                options: {
                    base: 'dist',
                    keepalive: true,
                    open: true,
                    port: 8080
                }
            }
        },

        jade: {
            dev: {
                options: {
                    pretty: true
                },
                files: {
                    "dist/index.html": "src/index.jade"
                }
            }
        },

        less: {
            dev: {
                options: {
                    paths: ['vendor', 'src/css']
                },
                files: {
                    "dist/css/style.css": "src/css/style.less"
                }
            }
        }
    });
};
