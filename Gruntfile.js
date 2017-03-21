// Generated on 2016-02-18 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    ngconstant: 'grunt-ng-constant',
    angularFileLoader: 'angular-file-loader'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    modules: 'rtobFormEngine',
    test: 'test',
    sonarIP: 'localhost',
    sonarPort: '9000',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    rtobFormEngine: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= rtobFormEngine.app %>/<%= rtobFormEngine.modules %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/<%= rtobFormEngine.modules %>/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      compass: {
        files: ['<%= rtobFormEngine.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= rtobFormEngine.app %>/{,*/,**/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= rtobFormEngine.app %>/img/{,*/,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    scsslint: {
      allFiles: [
        '<%= rtobFormEngine.app %>/styles/**/*.scss',
      ],
      options: {
        bundleExec: true,
        reporterOutput: 'coverage/styles/scss-lint-report.xml',
        colorizeOutput: true,
        emitSuccess: true,
        config: '.scss-lint.yml',
        compact: true,
        force: true
      },
    },

    hologram: {
      generate: {
        options: {
          config: 'styleguide/hologram_config.yml'
        }
      }
    },
    sonarRunner: {
      pii: {
        options: {
          debug: true,
          separator: '\n',
          sonar: {
            scm: {
              provider: 'git'
            },
            host: {
              url: 'http://localhost:9191'
            },
            projectKey: 'rtobFormEngine:rtobFormEngine:0.1.0',
            projectName: 'RTO Forms',
            projectVersion: '0.10',
            sources: ['app/rtobFormEngine'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      },
      main: {
        options: {
          debug: true,
          separator: '\n',
          sonar: {
            host: {
              url: 'http://localhost:9191'
            },
            projectKey: 'rtobFormEngine:rtobFormEngine:0.1.0',
            projectName: 'RTO Forms',
            projectVersion: '0.10',
            sources: ['app/common'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8'
          }
        }
      }
    },
    karmaSonar: {
      options: {
        defaultOutputDir: '.tmp/sonar/custom_options/',
        instance: {
          hostUrl: 'http://<%= rtobFormEngine.sonarIP %>:<%= rtobFormEngine.sonarPort %>'
        }

      },
      pii: {
        project: {
          key: 'rtobFormEngine:rtobFormEngine:0.1.0',
          name: 'RTO Forms',
          version: '0.10'
        },
        paths: [{
          framework: 'jasmine',
          cwd: '.', // the current working directory'
          src: 'app/rtobFormEngine', // the source directory within the cwd
          test: 'test/rtobFormEngine', // the test directory within the cwd
          reports: {
            coverage: 'coverage/rtobFormEngine/lcovonly/report-lcovonly.txt' //, // the glob for lcov files'
          }
        },{
          framework: 'jasmine',
          cwd: '.', // the current working directory'
          src: 'app/common', // the source directory within the cwd
          test: 'test/main', // the test directory within the cwd
          reports: {
            coverage: 'coverage/main/lcovonly/report-lcovonly.txt' //, // the glob for lcov files'
          }
        }],
        exclusions: []
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 3125,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 31250
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9055,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test/<%= rtobFormEngine.modules %>'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.modules)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= rtobFormEngine.app %>/<%= rtobFormEngine.modules %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/<%= rtobFormEngine.modules %>/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= rtobFormEngine.app %>/<%= rtobFormEngine.modules %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        src: ['test/<%= rtobFormEngine.modules %>/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>',
            '!<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/.git{,*/}*'
          ]
        }]
      },
      main: {
        files: [{
          dot: true,
          src: [
            '<%= rtobFormEngine.dist %>/main'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: ['> 2%', 'iOS 8']
          })
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
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

    // Automatically inject Angular components into the app
    angularFileLoader: {
      options: {
        scripts: [
          '<%= rtobFormEngine.app %>/<%= rtobFormEngine.modules %>/scripts/**/*.js',
            '<%= rtobFormEngine.app %>/common/**/*.js',
            //'<%= rtobFormEngine.app %>/common/**/*.json',
         // '<%= rtobFormEngine.app %>/common/controllers/**/*.js',
           '<%= rtobFormEngine.app %>/<%= rtobFormEngine.modules %>/scripts/{,*/}*.js',

           '<%= rtobFormEngine.app %>/<%= rtobFormEngine.modules %>/scripts/RtoFormMain.js'
        ]
      },
      target: {
        src: ['<%= rtobFormEngine.app %>/index.html']
      },
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= rtobFormEngine.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
      sass: {
        src: ['<%= rtobFormEngine.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= rtobFormEngine.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/img/generated',
        imagesDir: '<%= rtobFormEngine.app %>/img',
        javascriptsDir: '<%= rtobFormEngine.app %>/scripts',
        fontsDir: '<%= rtobFormEngine.app %>/fonts',
        importPath: './bower_components',
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/img/'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    // filerev: {
    // dist: {
    // src: [
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/scripts/{,*/}*.js',
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/styles/{,*/}*.css',
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/fonts/*'
    // ]
    // }
    // },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= rtobFormEngine.app %>/index.html',
      options: {
        dest: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/{,*/}*.html'],
      css: ['<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/styles/{,*/}*.css'],
      js: ['<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>',
          '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/img',
          '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/styles'
        ],
        patterns: {
          js: [
            [/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          ]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    // dist: {
    // files: {
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/styles/main.css': [
    // '.tmp/styles/{,*/}*.css'
    // ]
    // }
    // }
    // },
    // uglify: {
    // dist: {
    // files: {
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/scripts/scripts.js': [
    // '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/scripts/scripts.js'
    // ]
    // }
    // }
    // },
    // concat: {
    // dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= rtobFormEngine.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= rtobFormEngine.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>',
          src: ['*.html'],
          dest: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'rtob-form-engine',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/scripts/scripts.js'
        },
        cwd: '<%= rtobFormEngine.app %>',
        src: ['<%= rtobFormEngine.modules %>/scripts/**/*.html', 'common/templates/**/*.html'],
        dest: '.tmp/templates.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= rtobFormEngine.app %>',
          dest: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'img/{,*/,**/}*.{png,jpg,jpeg,gif,webp,svg}',
            'fonts/{,*/,**/}*',
            'common/mock/**/*.json'
          ]
        }, {
          expand: true,
          cwd: '.tmp/img',
          dest: '<%= rtobFormEngine.dist %>/<%= rtobFormEngine.modules %>/img',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= rtobFormEngine.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    injector: {
      options: {
        // Task-specific options go here.
        transform: function(filepath) {
          var path = require('path');
          var tempPath = filepath.replace('/.tmp/', '');
          var extension = path.extname(filepath).slice(1);
          var injectString = '';
          switch (extension) {
            case 'css':
              injectString = '<link rel="stylesheet" href="' + tempPath + '">';
              break;
            case 'js':
              injectString = '<script src="' + tempPath + '"></script>';
              break;
            case 'html':
              injectString = '<link rel="import" href="' + tempPath + '">';
              break;
            default:
              injectString = '';
          }
          return injectString;
        }
      },
      dependencies: {
        // Target-specific file lists and/or options go here.
        files: {
          '<%= rtobFormEngine.app %>/index.html': ['.tmp/styles/main.css', '.tmp/styles/main.css'],
        }
      },
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        //'imagemin',
        //'svgmin'
      ],
      style: [
        'compass:dist'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.<%= rtobFormEngine.modules %>.conf.js',
        singleRun: true
      }
    },
    ngconstant: {
      // Options for all targets
      options: {
        space: ' ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      apidev: {
        options: {
          dest: '<%= rtobFormEngine.app %>/common/services/Environment.js'
        },
        constants: {
          BASE_URL: {
            name: 'apidev',
            apiEndpoint: 'http://10.20.234.16:10073',
            SIGNON_TOKEN: 'AID=1|UID=6668121968|CID=01S8030703I|EBID=6500000016|NAME=XXXX|CTRY=SG|LANG=en|APP=OFX|is2FAAuthenticated=true|Segment=EXBN|RedirPageId=XFRPAGE'

          }
        }
      },
      apimock: {
        options: {
          dest: '<%= rtobFormEngine.app %>/common/services/Environment.js'
        },
        constants: {
          BASE_URL: {
            name: 'apimock',
            apiEndpoint: 'http://localhost:3000',
            SIGNON_TOKEN: 'AID=1|UID=6668121968|CID=01S8030703I|EBID=6500000016|NAME=XXXX|CTRY=SG|LANG=en|APP=OFX|is2FAAuthenticated=true|Segment=EXBN|RedirPageId=XFRPAGE'

          }
        }
      },
      test: {
        options: {
          dest: '<%= rtobFormEngine.app %>/common/services/Environment.js'
        },
        constants: {
          BASE_URL: {
            name: 'test',
            apiEndpoint: ''
          }
        }
      },
      ssid: {
          options: {
            dest: '<%= rtobFormEngine.app %>/common/services/Environment.js'
          },
          constants: {
            BASE_URL: {
              name: 'apidev',
              apiEndpoint: 'http://10.20.234.16:10073',
              SIGNON_TOKEN: 'AID=1|UID=6668121968|CID=01S8030703I|EBID=6500000016|NAME=XXXX|CTRY=SG|LANG=en|APP=OFX|is2FAAuthenticated=true|Segment=EXBN|RedirPageId=XFRPAGE'
            }
          }
       },
      noruby: {
        options: {
          dest: '<%= rtobFormEngine.app %>/common/services/Environment.js'
        },
        constants: {
          BASE_URL: {
            name: 'apidev',
            apiEndpoint: 'http://10.20.234.16:10073'
          }
        }
      },
      production: {
        options: {
          dest: '<%= rtobFormEngine.app %>/common/services/Environment.js'
        },
        constants: {
          BASE_URL: {
            name: 'production',
            apiEndpoint: 'http://localhost:9000'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-scss-lint');
  var env = grunt.option('env') || 'test';

  grunt.registerTask('sonar', 'Sends data to SOnar web server', function(ip, port) {
    if(ip !== undefined)
         grunt.config.set('rtobFormEngine.sonarIP', ip);
    if(port !== undefined)
      grunt.config.set('rtobFormEngine.sonarPort', port);
    switch (env) {
      case 'noruby':
          grunt.task.run('test:main');
          grunt.task.run('karmaSonar');
        break;
      case 'test':
      default:
          grunt.task.run('test:main');
          grunt.task.run('karmaSonar');
        break;
    }

  });
  grunt.registerTask('serve', 'Compile then start a connect web server', function(module, target) {

    grunt.config.set('rtobFormEngine.modules', module);
    var param = grunt.option('env');
    console.log('env -> ',env);


    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'injector',
      'clean:server',
      'angularFileLoader',
      'wiredep',
      'ngconstant:' + env,
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('ensurePhantomJsPath', function () {
      process.env.PHANTOMJS_BIN = './node_modules/phantomjs-prebuilt/bin/phantomjs';
      console.log(process.env.PHANTOMJS_BIN);
  });


  grunt.registerTask('test', 'Runs Unit Tests', function(module) {

    grunt.task.run(['ensurePhantomJsPath']);

    switch (module) {
      case 'pii':
        grunt.config.set('rtobFormEngine.modules', module);
        break;
      default:
        grunt.config.set('rtobFormEngine.modules', 'main');
    }

    //grunt.log.warn('Module is:' + module);
    switch (env) {
      case 'noruby':
        grunt.task.run([
          'clean:server',
          'ngconstant:' + env,
          'wiredep',
          'karma'
        ]);
        break;
      case 'test':
      default:
        grunt.task.run([
          'clean:server',
          'ngconstant:' + env,
          'wiredep',
          'scsslint',
          'karma'
        ]);
        break;
    }
  });

  grunt.registerTask('build', 'Prepares a distribution package', function(module) {

    grunt.config.set('rtobFormEngine.modules', module);

    grunt.task.run([
      'clean:dist',
      'angularFileLoader',
      'wiredep',
      'ngconstant:' + env,
      'useminPrepare',
      'concurrent:dist',
      'postcss',
      'ngtemplates',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'uglify',
      'usemin',
      'htmlmin',
      'clean:main'
    ]);
  });

  grunt.registerTask('build-style', 'Prepares a distribution package', function() {
    grunt.task.run([
      'build:styleguide',
      'hologram'
    ]);
  });


  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);
};
