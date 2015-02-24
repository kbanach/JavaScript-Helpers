define(['backbone','underscore', 'jquery'], function(Backbone, _, $) {
	return Backbone.View.extend({

		id: 'info-page',

		initialize: function() {
			console.log('Info view initialized!');
			this.render();
		},

		render: function() {
			this.el.innerHTML = '<p>Info page loaded</p>';
			// document.getElementById('page-content').appendChild(this.el);
			console.log('...and even rendered!', this);
			return this;
		}
	});
});