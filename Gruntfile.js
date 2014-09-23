'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  //var LIVE_RELOAD_PORT = 35729;

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: false
      },
      html: {
        files: ['<%= config.app %>/jade/{,*/}*.jade'],
        tasks: ['jade',
                'shell:cphtml']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles',
                'autoprefixer',
                'shell:cpcss']
      },
      tsclient: {
        files: ['<%= config.app %>/typings/*.ts'],
        tasks: ['typescript:client']
      },
      tsserver: {
        files: ['db/*.ts',
                'model/*.ts',
                'routes/*.ts',
                'util/*.ts'],
        tasks: ['typescript:server']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '<%= config.app %>/{,*/}*.html',
              '<%= config.app %>/scripts/{,*/}*.js',
              '.tmp',
              '<%= config.dist %>/*',
              '!<%= config.dist %>/.git*'
            ]
          }
        ]
      },
      server: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              'db/*.js',
              'model/*.js',
              'routes/*.js',
              'util/*.js'
            ]
          }
        ]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app.js',
        'test/spec/{,*/}*.js'
      ]
    },

    //    // Mocha testing framework configuration options
    //    mocha: {
    //      all: {
    //        options: {
    //          run: true,
    //          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
    //        }
    //      }
    //    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%',
                   'last 2 versions',
                   'Firefox ESR',
                   'Opera 12.1']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.png'
          ]
        }
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          '<%= config.app %>/master.html': '<%= config.app %>/jade/master.jade',
          '<%= config.app %>/index.html': '<%= config.app %>/jade/index.jade',
          '<%= config.app %>/list.html': '<%= config.app %>/jade/list.jade',
          '<%= config.app %>/score.html': '<%= config.app %>/jade/score.jade'
        }
      }
    },

    typescript: {
      client: {
        src: ['<%= config.app %>/typings/*.ts'],
        dest: '<%= config.app %>/scripts',
        options: {
          module: 'amd',
          target: 'es5',
          basePath: '<%= config.app %>/typings',
          sourceMap: false,
          declaration: false
        }
      },
      server: {
        src: ['db/*.ts',
              'model/*.ts',
              'routes/*.ts',
              'util/*.ts'],
        options: {
          module: 'commonjs',
          target: 'es5',
          sourceMap: false,
          declaration: false
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/master.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>',
                     '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.dist %>',
            src: '{,*/}*.html',
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    requirejs: {
      // !!! build.js options for app.index.js (index.html) !!!
      dist1: {
        options: {
          out: '<%= config.dist %>/scripts/app.index.js',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'app.index',
          mainConfigFile: '<%= config.app %>/scripts/app.index.js'
        }
      },
      // !!! build.js options for app.list.js (list.html) !!!
      dist2: {
        options: {
          out: '<%= config.dist %>/scripts/app.list.js',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'app.list',
          mainConfigFile: '<%= config.app %>/scripts/app.list.js'
        }
      },
      // !!! build.js options for app.score.js (score.html) !!!
      dist3: {
        options: {
          out: '<%= config.dist %>/scripts/app.score.js',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'app.score',
          mainConfigFile: '<%= config.app %>/scripts/app.score.js'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/scripts/app.index.js': '<%= config.dist %>/scripts/app.index.js',
          '<%= config.dist %>/scripts/app.list.js': '<%= config.dist %>/scripts/app.list.js',
          '<%= config.dist %>/scripts/app.score.js': '<%= config.dist %>/scripts/app.score.js'
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              '*.{ico,png,txt}',
              'images/{,*/}*.webp',
              '{,*/}*.html',
              'styles/fonts/{,*/}*.*'
            ]
          },
          {
            src: 'node_modules/apache-server-configs/dist/.htaccess',
            dest: '<%= config.dist %>/.htaccess'
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          }
        ]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    open: {
      dev: {
        path: 'http://localhost:3000/'
      }
    },
    shell: {
      cpapp: {
        command: function() {
          return [
            'rm -r public',
            'mkdir public',
            'cp -R app/bower_components public/bower_components',
            'cp -R app/images public/images',
            'cp -R app/scripts public/scripts',
            'cp -R app/styles public/styles',
            'cp app/*.html public/',
            'cp app/*.ico public/'
          ].join('&&');
        }
      },
      cphtml: {
        command: function() {
          return [
            'cp -f app/*.html public/'
          ].join('&&');
        }
      },
      cpjs: {
        command: function() {
          return [
            'cp -f app/scripts/*.js public/scripts/'
          ].join('&&');
        }
      },
      cpcss: {
        command: function() {
          return [
            'cp -f app/styles/*.css public/styles/'
          ].join('&&');
        }
      },
      cpdist: {
        command: function() {
          return [
            'rm -r public',
            'mkdir public',
            'cp -R dist/ public/'
          ].join('&&');
        }
      }
    }
  });

  grunt.registerTask('serve',
    'start the server and preview your app, --allow-remote for remote access',
    function(target) {
      if(target === 'dist') {
        return grunt.task.run(['build',
                               'open']);
      }

      grunt.task.run([
        'jshint',
        'clean:server',
        'jade',
        'typescript:client',
        'typescript:server',
        'concurrent:server',
        'autoprefixer',
        'shell:cpapp',
        'open',
        'watch'
      ]);
    });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ?
                    ('serve:' + target) :
                    'serve']);
  });

  //  grunt.registerTask('test', function(target) {
  //    if(target !== 'watch') {
  //      grunt.task.run([
  //        'clean:server',
  //        'concurrent:test',
  //        'autoprefixer'
  //      ]);
  //    }
  //
  //    grunt.task.run([
  //      'connect:test'
  //      //'mocha'
  //    ]);
  //  });

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'jade',
    'typescript:server',
    'typescript:client',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'requirejs',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin',
    'shell:cpdist'
  ]);

  grunt.registerTask('cleanjs', [
    'clean:dist',
    'clean:server'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'clean:server',
    'jshint',
    'jade',
    'typescript:client',
    'typescript:server',
    'watch'
  ]);
};
