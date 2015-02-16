define([
	'backbone'
], function (
	Backbone
) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			'home': 'showHome',
			'info': 'showInfo'
		},

		showHome: function RouteHelp() {
			console.log('You are looking at HELP!');
		},

		showInfo: function RouteInfo() {
			console.log('You are looking at INFO!');
		}
	});

	return AppRouter;

});