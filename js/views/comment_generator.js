define(['backbone','models/comment_parser'], function(Backbone, CommentParserModel) {
	return Backbone.View.extend({
		model: new CommentParserModel(),

		id: 'comment-parsers',

		events: {
			'click #generateConsoleLogs': 'generateLogs'
		},

		initialize: function() {
			console.log('Console generator view!');
			this.render();
		},

		render: function (){
			var viewContent = document.createDocumentFragment();

			viewContent.id = this.id;
			
			this.consoleInput = document.createElement('textarea');
			this.consoleOutput = document.createElement('pre');
			this.consoleSubmit = document.createElement('button');

			viewContent.appendChild(this.consoleInput);
			viewContent.appendChild(this.consoleSubmit);
			viewContent.appendChild(this.consoleOutput);

			this.consoleSubmit.innerHTML = 'Generate logs!';
			this.consoleSubmit.id = 'generateConsoleLogs';

			
			this.el.innerHTML = '<h2>Console.log Generator</h2>';
			this.el.appendChild(viewContent);			
			
			return this;
		},

		generateLogs: function() {
			this.consoleOutput.innerHTML = this.model.generate(this.consoleInput.value);
		}
	});
});