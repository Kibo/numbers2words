module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		 concat : {
			dist : {
				src : ['src/polyfill/*.js', 'src/<%= pkg.name %>.js', 'src/locales/*.js','src/node/*.js' ],
				dest : 'build/<%= pkg.name %>.js'
			}
		},

		qunit : {
			files : ['test/*.html']
		},

		jshint : {
			// define the files to lint
			files : ['gruntfile.js', 'src/<%= pkg.name %>.js', 'src/locales/*.js'],
			options : {	
				"-W099": true, // disable: Mixed spaces and tabs.
				"-W014": true, // disable: Bag line breaking    				
			}
		},

		uglify : {
			options : {
				// the banner is inserted at the top of the output
				banner : '/*! <%= pkg.name %> v<%= pkg.version %> */\n'
			},
			dist : {
				files : {
					'build/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('test', ['qunit']);
}; 