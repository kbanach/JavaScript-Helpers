define(['backbone', 'underscore'], function(Backbone, _) {
	function makeLine(lineContent, config) {
		return config.prefix + lineContent + config.postfix;
	}

	function generateLogs(model) {
		var modelJSON = model.toJSON(),
			output = '',
			lines,
			i;

		lines = modelJSON.input.split('\n');

		for (i = 0; i < lines.length; i++) {
			output += makeLine(lines[i], modelJSON) + '\n';
		}

		// output += modelJSON.prefix + modelJSON.input + modelJSON.postfix;

		return output;
	}

	return Backbone.Model.extend({
		defaults: {
			input: '',
			output: '',
			placeholder: '*',
			lineLength: 80,
			prefix: 'console.log(\'',
			postfix: '\');'
		},

		generate: function(newInput) {
			if (_.isString(newInput)) {
				this.set({ input:  newInput });
				this.set({ output: generateLogs(this)} );

				return this.get('output');
			} else {
				throw new Error('Given input is not an string');
			}
		}
	});
});