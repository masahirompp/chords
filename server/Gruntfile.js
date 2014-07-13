'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      typescriptServer: {
        tasks: ['typescript:server'],
        files: ['app.ts',
          'model.ts',
          'routes/**.ts'
        ]
      },
      typescriptClient: {
        tasks: ['typescript:client'],
        files: [
          'public/scripts/**.ts'
        ]
      },
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
    typescript: {
      server: {
        src: ['app.ts',
          'model.ts',
          'routes/**.ts'
        ],
        dest: 'app.js',
        options: {
          module: 'commonjs', //or amd
          target: 'es5', //or es3
          sourceMap: false,
          declaration: false,
          indentStep: 2
        }
      },
      client: {
        src: [
          'public/scripts/**.ts'
        ],
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          sourceMap: false,
          declaration: false,
          indentStep: 2
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: [
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
      publish: {
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
      'typescript:server',
      'typescript:client',
      'open',
      'shell:start'
    ]);
  });

  grunt.registerTask('default', 'compile typescript.', function() {
    grunt.task.run([
      'typescript:server',
      'typescript:client',
      'watch',
    ]);
  });

  grunt.registerTask('jshint', 'jshint.', function() {
    grunt.task.run([
      'jshint'
    ]);
  });

  grunt.registerTask('publish', 'copy ../client/dist/ to public/', function() {
    grunt.task.run([
      'shell:publish'
    ]);
  });
};
