define([
	'jquery', 
	'underscore', 
	'backbone',
	'views/home',
	'views/comment_generator',
	'views/info'
], function(
	$, 
	_, 
	Backbone,
	Home,
	ConsoleGen,
	Info
) {

	var MainViewElement = document.getElementById('page-content'),
		AppRouter;

	AppRouter = Backbone.Router.extend({
		routes: {
			'home': 'showHome',
			'info': 'showInfo',
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