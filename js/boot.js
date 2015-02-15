require.config({
	baseUrl: './js',

	deps: ['main'], // this is where app is loaded
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	},

	packages: [
		{
			name: 'underscore',
			location: 'libs/underscore',
			main: 'underscore'
		},
		{
			name: 'backbone',
			location: 'libs/backbone',
			main: 'backbone'
		},
		{
			name: 'jquery',
			location: 'libs/jquery',
			main: 'jquery-2.1.3'
		}
	]
});

// require(['main'], function(Main) {
// 	Main.initialize();
// });

/*
require.config({
	baseUrl: './scripts',
	deps: ['main'], // this is where app is loaded
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	},
	packages: [
		{
			name: 'underscore',
			location: '../libs',
			main: 'underscore-min'
		},
		{
			name: 'backbone',
			location: '../libs',
			main: 'backbone-min'
		},
		{
			name: 'jquery',
			location: '../libs',
			main: 'jquery-2.1.3.min'
		}
	]
});
*/