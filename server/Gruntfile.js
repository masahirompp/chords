'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      jshint: {
        tasks: ['jshint'],
        files: [
          'app.js',
          'model.js',
          'route/*.js'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'app.js',
        'model.js',
        'route/*.js'
      ]
    },
    open: {
      dev: {
        path: 'http://localhost:3000/'
      }
    },
    shell: {
      start: {
        options: {
          stdout: false
        },
        command: function() {
          return 'npm start';
        }
      }
    }
  });

  grunt.registerTask('serve', 'server start.', function() {
    grunt.task.run([
      'jshint',
      'open',
      'shell'
    ]);
  });

  grunt.registerTask('default', 'jshint', function() {
    grunt.task.run([
      'jshint',
      'watch',
    ]);
  });
};
