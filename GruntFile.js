module.exports =function(grunt){
     //Configure your tasks
     //matchdep reduces repetitive code by utilizing the package.json file to loadNpmTasks
     require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
     grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),//load properties from the package as a JSON object
      watch: {
        options:{
          livereload: true
        },
        js: {
          files:   ['site/scripts/*.js'],
          tasks:   ['copy']
        },
        css:{
          files:   ['site/styles/*.styl'],
          tasks:   ['stylus']
        },
        html:{
          files:   ['site/*.jade'],
          tasks:   ['jade']
        }
      },
      uglify: {
        my_target: {
          files: {
            'build/js/scripts.min.js': ['build/js/scripts.js']
          }
        }
      },
      copy: {
        main: {
          expand: true,
          cwd: 'site/scripts',
          src: '*',
          dest: 'build/js'
        },
      },
      stylus:{
        compile: {
          options:{
            import:['nib']
          },
          files: {
            'build/css/styles.css': ['site/styles/*.styl'] // compile and concat into single file
          }
        }

      },
      jade:{
        compile:{
          options: {pretty:true},
          files:[{
            expand: true,
            cwd:    'site/',
            src:    "*.jade",
            ext:    ".html",
            dest:   "build/"
          }]
        }
      },
      'gh-pages': {
        options: {
          base: 'build'
        },
        src: ['**']
      }
     });

     //Register (load) the plugins to make them available in Grunt
     //matchdep makes this unnecessary, but it's added here for reference.
     // grunt.loadNpmTasks('grunt-contrib-watch');
     // grunt.loadNpmTasks('grunt-contrib-coffee');
     // grunt.loadNpmTasks('grunt-contrib-stylus');
     // grunt.loadNpmTasks('grunt-contrib-jade');
     // grunt.loadNpmTasks('grunt-contrib-imagemin');
     // grunt.loadNpmTasks('grunt-contrib-uglify');
     // grunt.loadNpmTasks('grunt-contrib-copy');

     //Run the task
     //Copy is registered but not executed. Refer to commented code in the initConfig method for details on how to add it.
     grunt.registerTask('default', ['watch','stylus', 'jade', 'copy']);
     grunt.registerTask('build', ['stylus','jade', 'copy']);
     grunt.registerTask('pages', ['build','gh-pages']);
};
