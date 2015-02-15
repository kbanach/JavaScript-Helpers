define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	console.log($);
	console.log(_);
	console.log(Backbone);

	return Backbone.Model.extend({
		initialize: function() {

			console.log('I\'m initialized!');
		}
	});
});