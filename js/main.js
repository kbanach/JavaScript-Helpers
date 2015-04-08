define([
	'jquery', 
	'underscore', 
	'backbone',
	'views/home',
	'views/prototype_basics',
	'views/prototype_advanced',
	'views/mixin',
	'views/comment_generator',
	'views/info'
], function(
	$, 
	_, 
	Backbone,
	Home,
	PrototypeBasics,
	PrototypeAdvanced,
	Mixin,
	ConsoleGen,
	Info
) {

	var MainViewElement = document.getElementById('page-content'),
		AppRouter;

	AppRouter = Backbone.Router.extend({
		routes: {
			'home': 'showHome',
			'info': 'showInfo',
			'prototype': 'showPrototypeBasics',
			'prototype_advanced': 'showPrototypeAdvanced',
			'mixin': 'showMixin',
			'console': 'showConsoleGenerator'
		},

		showHome: function showHomeRoute() {
			console.log('You are looking at HELP!');
			console.log(Home);
			this.loadView(new Home());
		},

		showInfo: function showInfoRoute() {
			console.log('You are looking at INFO!');
			this.loadView(new Info());
		},

		showMixin: function showMixinRoute() {
			console.log('You are looking at Mixin!');
			this.loadView(new Mixin());
		},
		
		showPrototypeBasics: function showPrototypeBasicsRoute() {
			console.log('You are looking at prototype basics!');
			this.loadView(new PrototypeBasics());
		},

		showPrototypeAdvanced: function showshowPrototypeAdvancedRoute() {
			console.log('You are looking at prototype basics!');
			this.loadView(new PrototypeAdvanced());
		},

		showConsoleGenerator: function showInfoRoute() {
			console.log('You are looking at INFO!');
			this.loadView(new ConsoleGen());
		},

		loadView: function(view) {
			if (this.view) {
				MainViewElement.removeChild(this.view.el);
				this.view.remove();	
			}
			
			this.view = view;
			MainViewElement.appendChild(this.view.el);
		}
	});

	return Backbone.Model.extend({
		initialize: function () {
			var appRouter = new AppRouter();

			Backbone.history.start();
			console.log('I\'m initialized!');
		}
	});
});
