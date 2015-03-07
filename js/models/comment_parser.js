define(['backbone', 'underscore', 'jquery'], function(Backbone, _, $) {
	function generateChars(oneChar, stringLength) {
		var output = '',
			i = stringLength;

		while (0 < i--) {
			output += oneChar;
		}

		return output;
	}

    /**
    * got it from here: http://goo.gl/SE4Epu
    */
    function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

	function makeLine(lineContent, config) {
		var align = config.textAlign || 'left',
			additionalSpacers = (2 * config.extraSpace) + (2 * config.border),
            availabeSpace = config.lineLength - additionalSpacers,
            fillerChar = (config.filled) ? config.placeholder : '&nbsp;', 
			content = '',
            escapedContent,
            fillLength,
            startChop, endChop;

		if (typeof lineContent === 'string' && lineContent !== '') {
            console.log(lineContent, lineContent.length, (lineContent !== ''));

            if ( lineContent.length > availabeSpace ) {
                startChop = 0;

                while (startChop < lineContent.length) {
                    content += makeLine(lineContent.substr(startChop, availabeSpace), config);
                    startChop += availabeSpace;
                }

                return content;
            }

			escapedContent = escapeHtml(lineContent);
			fillLength = config.lineLength - lineContent.length - additionalSpacers;

		} else {
            fillLength = config.lineLength - additionalSpacers;

			return config.prefix + 
                (config.border) ? config.placeholder : '' +
                (config.extraSpace) ? ' ' : ''
				generateChars(fillerChar, fillLength) +
                (config.extraSpace) ? ' ' : ''
                (config.border) ? config.placeholder : '' +
				config.postfix + '\n';
		}

		switch (align) {
			case 'right':
				content += (config.border) ? config.placeholder : '';
				content += generateChars(fillerChar, fillLength);
				content += (config.extraSpace) ? ' ' : '';
				content += escapedContent;
				content += (config.extraSpace) ? ' ' : '';
				content += (config.border) ? config.placeholder : '';
				break;
			case 'center':
				content += (config.border) ? config.placeholder : '';
				content += generateChars(fillerChar, Math.floor(fillLength / 2) );
				content += (config.extraSpace) ? ' ' : '';
				content += escapedContent;
				content += (config.extraSpace) ? ' ' : '';
				content += generateChars(fillerChar, Math.ceil(fillLength / 2) );
				content += (config.border) ? config.placeholder : '';
				break;
			default: 
				content += (config.border) ? config.placeholder : '';
				content += (config.extraSpace) ? ' ' : '';
				content += escapedContent;
				content += (config.extraSpace) ? ' ' : '';
				content += generateChars(fillerChar, fillLength);
				content += (config.border) ? config.placeholder : '';
				break;
		}

		return config.prefix + content + config.postfix + '\n';
	}

	function generateLogs(model) {
		var modelJSON = model.toJSON(),
			output = '',
			lines,
			i;

		lines = modelJSON.input.split('\n');

		for (i = 0; i < lines.length; i++) {
			output += makeLine(lines[i].trim(), modelJSON);
		}

		return output;
	}

	return Backbone.Model.extend({
		defaults: {
			input: '',
			output: '',
			placeholder: '*',
			lineLength: 80,
			prefix: 'console.log(\'',
			postfix: '\');',
			textAlign: 'left', // 'left', 'right', 'center',
			extraSpace: true,
			border: true,
            filled: true
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