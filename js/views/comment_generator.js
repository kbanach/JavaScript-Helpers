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

		minLineLength: 10,

		maxLineLength: 120,

		templateConfig: {
			consoleLogFormName: 'console-log-form',
			inputFieldId: 'console-input',
			outputFieldId: 'console-output',

			viewTitle: 'Logs Generator',
			commentInputLabel: 'Console.log Generator',
			placeHold: 'Placeholder',
			placeHoldId: 'placeHold',
			commentLength: 'Comment length',
			commentLengthId: 'commentLength',
			prefix: 'Text before',
			prefixId: 'prefix',
			postfix: 'Text after',
			postfixId: 'postfix',
			hasBorder: 'Border around',
			hasBorderId: 'hasBorder',
			extraSpace: 'Extra spacebar',
			extraSpaceId: 'extraSpace',
			fillSpace: 'Fill empty space',
			fillSpaceId: 'fillSpace',
			selectAlign: 'Text align',
			selectAlignId: 'textAlign',
			selectAlignFields: {
				'left': 'Left',
				'center': 'Center',
				'right': 'Right'
			},
			submitButton: 'Generate logs!',
			submitButtonId: 'generateConsoleLogs',
			markAllButton: 'Mark it!',
			markAllButtonId: 'markAll'
		},

		events: {
			'focusout #placeHold': 'changePlaceholder',
			'change #commentLength': 'changeCommentLength',
			'focusout #prefix': 'changePrefix',
			'focusout #postfix': 'changePostfix',
			'change #hasBorder': 'changeBorder',
			'change #extraSpace': 'changeSpace',
			'change #fillSpace': 'changeFillSpace',
			'change #textAlign': 'changeAlign',
			'click #generateConsoleLogs': 'generateLogs',
			'click #markAll': 'markAll'
		},

		initialize: function() {
			console.log('Console generator view!');
			this.render();
		},

		render: function (){
			this.el.innerHTML = this.template(this.templateConfig);

			this.placehold = this.el.querySelector('#' + this.templateConfig.placeHoldId);
			this.commentLength = this.el.querySelector('#' + this.templateConfig.commentLengthId);
			this.prefixInput = this.el.querySelector('#' + this.templateConfig.prefixId);
			this.postfixInput = this.el.querySelector('#' + this.templateConfig.postfixId);
			this.consoleInput = this.el.querySelector('#' + this.templateConfig.inputFieldId);
			this.consoleOutput = this.el.querySelector('#' + this.templateConfig.outputFieldId);
			this.hasBorder = this.el.querySelector('#' + this.templateConfig.hasBorderId);
			this.extraSpace = this.el.querySelector('#' + this.templateConfig.extraSpaceId);
			this.fillSpace = this.el.querySelector('#' + this.templateConfig.fillSpaceId);
			this.textAlign = this.el.querySelector('#' + this.templateConfig.selectAlignId);

			this.placehold.value = this.model.get('placeholder');
			this.commentLength.value = this.model.get('lineLength');
			this.prefixInput.value = this.model.get('prefix');
			this.postfixInput.value = this.model.get('postfix');
			
			return this;
		},

		changePlaceholder: function () {
			this.model.set({ placeholder: this.placehold.value[0] }); 
		},

		changeCommentLength: function () {
			this.model.set({
				lineLength: 
					Math.max( Math.min( parseInt(this.commentLength.value, 10), this.maxLineLength), this.minLineLength)  
			});
		},

		changePrefix: function() {
			this.model.set({ prefix: this.prefixInput.value }); 
		},

		changePostfix: function() {
			this.model.set({ postfix: this.postfixInput.value }); 
		},

		changeBorder: function() {
			this.model.set({ border: !!this.hasBorder.checked });
		},

		changeSpace: function() {
			this.model.set({ extraSpace: !!this.extraSpace.checked }); 
		},

		changeFillSpace: function() {
			this.model.set({ filled: !!this.fillSpace.checked }); 	
		},

		changeAlign: function() {
			this.model.set({ textAlign: this.textAlign.value }); 
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