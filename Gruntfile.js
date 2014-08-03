module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			uses_defaults: ['app/*.js', 'Gruntfile.js']
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec', ui:'bdd'
				},
				src: ['test/*.js']
			}
		},

		develop: {
			server: {
				file: 'server.js'
			}
		},

		watch: {
			tests: {
				src: ['test/*.js'],
				files: ['test/*.js'], //, 'jshint'
				tasks: ['mochaTest']
			},
			js: {
				files: ['server.js', 'app/*.js'],
				tasks: ['develop', 'mochaTest', 'jshint']
			}
		},

		//Add support for this in the future.
		connect: {
			website: {
				options: {
					port: 8001,
					base: 'test/test-package-source'
				}
			}
		}
	})

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

	grunt.registerTask('default', 'jshint', 'mochaTest')
	grunt.registerTask('dev', ['develop', 'watch'])
}