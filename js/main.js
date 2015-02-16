define([
	'jquery', 
	'underscore', 
	'backbone',
	'router'
], function(
	$, 
	_, 
	Backbone,
	Router
) {

	var Main = Backbone.Model.extend({
		initialize: function () {

			console.log('HELLOOO nr 2!');
			var AppRouter = new Router();

			Backbone.history.start();
			console.log('I\'m initialized!');
		}
	});

	return Main;
});