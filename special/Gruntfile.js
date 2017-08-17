module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            compile: {
                files: {
                    'css/core.css': ['css/core.scss']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'css/core.css': ['css/core.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    'js/core.js': ['js/core.js']
                }
            }
        },
        imagemin: {
          dist: {
              options: {
                  optimizationLevel: 3
              },
              files: [{
                  expand: true,
                  cwd: 'imgsss/',
                  src: ['**/*.{png,jpg,jpeg}'],
                  dest: 'imgssss/'
               }]
            }
        },
        watch: {
            scripts: {
                files: [
                    'css/*.scss',
                    'js/*.js'
                ],
                tasks: ['sass', 'cssmin', 'uglify']
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'imagemin', 'watch']);
};