define(['backbone', 'underscore'], function(Backbone, _) {
	function generateLogs(model) {
		var output = '',
			modelJSON = model.toJSON();

		output += modelJSON.prefix + modelJSON.input + modelJSON.postfix;

		return output;
	}

	return Backbone.Model.extend({
		defaults: {
			input: '',
			output: '',
			prefix: 'console.log(\'',
			postfix: '\');'
		},

		generate: function(newInput) {
			if (_.isString(newInput)) {
				this.set({ input:  newInput });
				this.set({ output: generateLogs(this)} );

				return this.get('output');
			} else {
				throw new Error('Given input is not an event');
			}
		}
	});
});