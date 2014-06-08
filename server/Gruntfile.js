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
          'routes/*.js',
          'public/scripts/**/*.js'
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
        'routes/*.js',
        'public/scripts/**/*.js'
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
          stdout: true
        },
        command: function() {
          return 'npm start';
        }
      },
      public: {
        options: {
          stdout: true
        },
        command: function() {
          return [
            'rm -r public',
            'mkdir public',
            'cp -R ../client/dist/ public/'
          ].join('&&');
        }
      }
    }
  });

  grunt.registerTask('serve', 'server start.', function() {
    grunt.task.run([
      'jshint',
      'open',
      'shell:start'
    ]);
  });

  grunt.registerTask('default', 'jshint', function() {
    grunt.task.run([
      'jshint',
      'watch',
    ]);
  });

  grunt.registerTask('public', 'copy ../client/dist/ to public/', function() {
    grunt.task.run([
      'shell:public'
    ]);
  });
};
