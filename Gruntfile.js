module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			uses_defaults: ['app/**/*.js', 'Gruntfile.js']
		},

		mochaTest: {
			test: {
				options: {
					resporter: 'spec'
				},
				src: ['test/**/*.js']
			}
		},

		watch: {
			options: {
				nospawn: true
			},
			mochaTests: {
				files: ['app/**/*.js', 'test/**/*.js'],
				tasks: 'mochaTest'
			}
		},

		connect: {
			website: {
				options: {
					port: 8000,
					base: 'test/test-package-source'
				}
			}
		},

		develop: {
			server: {
				file: '../AsimovDeploy.NodeFront/server.js',
				nodeArgs: ['--debug']
			},
			node: {
				file: 'server.js'
			}
		},

		concurrent: {
			nodeFront: {
				tasks: ['develop:node'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	})

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.registerTask('default', 'jshint', 'mochaTest')

	grunt.registerTask('env', ['connect:website', 'develop:server', 'watch'])
	grunt.registerTask('node', ['develop:node', 'watch'])
	//grunt.registerTask('dev', ['connect:website', 'develop:server', 'concurrent:nodeFront', 'watch'])
}