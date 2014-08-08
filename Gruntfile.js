module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: 'example/*.scss',
        tasks: ['sass']
      },
      js: {
        files: ['angular-loading-button.js'],
        tasks: [
          'uglify'
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'example/angular-loading-button.css': 'example/angular-loading-button.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("mm/dd/yyyy") %>\n' +
                ' * <%= pkg.description %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Licensed <%= pkg.license %>\n' +
                ' */\n'
      },
      build: {
        src: 'angular-loading-button.js',
        dest: 'angular-loading-button.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('serve', [
    'sass',
    'uglify',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'sass',
    'uglify'
  ]);
}
