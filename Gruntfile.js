'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  //var LIVE_RELOAD_PORT = 35729;

  // Configurable paths
  var config = {
    'app': 'app',
    'dist': 'dist',
    'public': 'public'
  };

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: false
      },
      ect: {
        files: ['<%= config.app %>/*.ect'],
        tasks: ['copy:app2views']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['copy:css2public']
      },
      tsclient: {
        files: ['<%= config.app %>/typings/{,*/}*.ts'],
        tasks: ['typescript:client', 'copy:js2public']
      },
      tsserver: {
        files: ['db/*.ts', 'dto/*.ts', 'models/*.ts', 'routes/*.ts', 'util/*.ts'],
        tasks: ['typescript:server']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'app.js', 'test/spec/{,*/}*.js']
    },

    typescript: {
      client: {
        src: ['<%= config.app %>/typings/{,*/}*.ts'],
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
        src: ['db/*.ts', 'dto/*.ts', 'models/*.ts', 'routes/*.ts', 'util/*.ts'],
        options: {
          module: 'commonjs',
          target: 'es6',
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
      html: '<%= config.app %>/layout.ect'
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: ['copy:styles2tmp'],
      test: ['copy:styles2tmp'],
      dist: ['copy:styles2tmp', 'imagemin', 'svgmin']
    }, // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    requirejs: {
      // !!! build.js options for app.index.js (index.ect) !!!
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
      }, // !!! build.js options for app.search.js (search.ect) !!!
      dist2: {
        options: {
          out: '<%= config.dist %>/scripts/app.search.js',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'app.search',
          mainConfigFile: '<%= config.app %>/scripts/app.search.js'
        }
      }, // !!! build.js options for app.score.js (score.ect) !!!
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
      }, // !!! build.js options for app.works.js (works.ect) !!!
      dist4: {
        options: {
          out: '<%= config.dist %>/scripts/app.works.js',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'app.works',
          mainConfigFile: '<%= config.app %>/scripts/app.works.js'
        }
      }, // !!! build.js options for app.edit.js (edit.ect) !!!
      dist5: {
        options: {
          out: '<%= config.dist %>/scripts/app.edit.js',
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          name: 'app.edit',
          mainConfigFile: '<%= config.app %>/scripts/app.edit.js'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/scripts/app.index.js': '<%= config.dist %>/scripts/app.index.js',
          '<%= config.dist %>/scripts/app.search.js': '<%= config.dist %>/scripts/app.search.js',
          '<%= config.dist %>/scripts/app.score.js': '<%= config.dist %>/scripts/app.score.js',
          '<%= config.dist %>/scripts/app.works.js': '<%= config.dist %>/scripts/app.works.js'
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: ['<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/*.png'
          ]
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/layout.ect',
        '<%= config.dist %>/index.ect',
        '<%= config.dist %>/search.ect',
        '<%= config.dist %>/score.ect',
        '<%= config.dist %>/works.ect',
        '<%= config.dist %>/edit.ect'
      ],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    htmlmin: {
      dist2views: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '*.ect',
          dest: 'views'
        }]
      }
    },

    open: {
      dev: {
        path: 'http://localhost:3000/'
      }
    },

    // Empties folders to start fresh
    clean: {
      app: {
        files: [{
          dot: true,
          src: ['<%= config.app %>/scripts/{,*/}*.js']
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= config.dist %>/*', '!<%= config.dist %>/.git*']
        }]
      },
      views: {
        files: [{
          dot: true,
          src: ['views/*']
        }]
      },
      server: {
        files: [{
          dot: true,
          src: ['.tmp', 'db/*.js', 'dto/*.js', 'models/*.js', 'routes/*.js', 'util/*.js']
        }]
      },
      'public': {
        files: [{
          dot: true,
          src: ['<%= config.public %>/*']
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      app2dist: {
        files: [{
          expand: true,
          dot: false,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: ['*.{ico,png,txt}', 'images/{,*/}*.*', '{,*/}*.ect', 'styles/fonts/{,*/}*.*']
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: false,
          cwd: '<%= config.app %>/bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: false,
          cwd: '<%= config.app %>/bower_components/font-awesome',
          src: 'fonts/*',
          dest: '<%= config.dist %>'
        }]
      },
      styles2tmp: {
        expand: true,
        dot: false,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      js2public: {
        expand: true,
        dot: false,
        cwd: '<%= config.app %>',
        dest: '<%= config.public %>',
        src: 'scripts/{,*/}*.*'
      },
      css2public: {
        expand: true,
        dot: false,
        cwd: '<%= config.app %>',
        dest: '<%= config.public %>',
        src: 'styles/{,*/}*.*'
      },
      app2public: {
        files: [{
          expand: true,
          dot: false,
          cwd: '<%= config.app %>',
          dest: '<%= config.public %>',
          src: ['*.{ico,png,txt}', 'bower_components/**', 'images/**', 'scripts/**', 'styles/**']
        }, {
          expand: true,
          dot: false,
          cwd: '<%= config.app %>/bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.public %>'
        }]
      },
      app2views: {
        expand: true,
        dot: false,
        cwd: '<%= config.app %>',
        dest: 'views',
        src: '*.ect'
      },
      dist2public: {
        files: [{
          expand: true,
          dot: false,
          cwd: '<%= config.dist %>',
          dest: '<%= config.public %>',
          src: ['*.{ico,png,txt}', 'images/{,*/}*.*', 'scripts/{,*/}*.*', 'styles/{,*/}*.*', 'fonts/*']
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.public %>/.htaccess'
        }]
      }
    }

  });

  grunt.registerTask('serve',
    'start the server and preview your app, --allow-remote for remote access',
    function(target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'open']);
      }

      grunt.task.run(['jshint',
        'clean:app',
        'clean:server',
        'clean:views',
        'typescript:client',
        'typescript:server',
        'copy:app2public',
        'copy:app2views',
        'open',
        'watch'
      ]);
    });
  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });
  grunt.registerTask('s', function(target) {
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', ['jshint',
    'clean:app',
    'clean:dist',
    'clean:server',
    'clean:views',
    'clean:public',
    'typescript:server',
    'typescript:client',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'requirejs',
    'concat',
    'cssmin',
    'uglify',
    'copy:app2dist',
    'rev',
    'usemin',
    'htmlmin:dist2views',
    'copy:dist2public'
  ]);
  grunt.registerTask('b', function() {
    grunt.task.run('build');
  });

  // cleanup
  grunt.registerTask('cleanup', ['clean:app', 'clean:dist', 'clean:server', 'clean:views']);
  grunt.registerTask('cu', function() {
    grunt.task.run('cleanup');
  });

  // server complie
  grunt.registerTask('cs', ['typescript:server']);

  // client complie
  grunt.registerTask('cc', ['typescript:client']);

  grunt.registerTask('default', ['clean:app', 'clean:server', 'typescript:client', 'typescript:server', 'watch']);

};
