define([
	'backbone',
	'models/comment_parser',
	'helpers/elementSelector',
	'dotjs',
	'text!templates/comment_generator.html'
], function(
	Backbone, 
	CommentParserModel,
	elementSelector,
	doT,
	templateHtml
) {
	return Backbone.View.extend({

		model: new CommentParserModel(),

		id: 'comment-parsers',

		template: doT.template(templateHtml),

		langs: {
			consoleLogFormName: 'console-log-form',
			inputFieldId: 'console-input',
			outputFieldId: 'console-output',

			viewTitle: 'Logs Generator',
			commentInputLabel: 'Console.log Generator',
			submitButton: 'Generate logs!',
			submitButtonId: 'generateConsoleLogs',
			markAllButton: 'Mark it!',
			markAllButtonId: 'markAll'
		},

		events: {
			'click #generateConsoleLogs': 'generateLogs',
			'click #markAll': 'markAll'
		},

		initialize: function() {
			console.log('Console generator view!');
			this.render();
		},

		render: function (){
			this.el.innerHTML = this.template(this.langs);

			this.consoleInput = this.el.querySelector('#' + this.langs.inputFieldId);
			this.consoleOutput = this.el.querySelector('#' + this.langs.outputFieldId);
			
			return this;
		},

		generateLogs: function(event) {
			event.preventDefault();

			this.consoleOutput.innerHTML = this.model.generate(this.consoleInput.value);
		},

		markAll: function(event) {
			event.preventDefault();

			elementSelector(this.consoleOutput);
		}
	});
});