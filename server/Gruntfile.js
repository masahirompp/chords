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
    }
  });

  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...')
      .ok();

    grunt.task.run([
      'jshint',
      'watch'
    ]);

  });
};
