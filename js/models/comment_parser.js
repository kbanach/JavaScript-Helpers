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

        } else if (lineContent === null) { 

            content += config.prefix;
            content +=  generateChars(config.placeholder, config.lineLength);
            content +=  config.postfix + '<br />';

            return content;

        } else {
            fillLength = config.lineLength - additionalSpacers;

            content += config.prefix;
            content +=  (config.border) ? config.placeholder : '' ;
            content +=  (config.extraSpace) ? fillerChar : '';
            content +=  generateChars(fillerChar, fillLength);
            content +=  (config.extraSpace) ? fillerChar : '';
            content +=  (config.border) ? config.placeholder : '';
            content +=  config.postfix + '<br />';

            return content;
        }


        content += (config.border) ? config.placeholder : '';

        switch (align) {
            case 'right':
                content += generateChars(fillerChar, fillLength);
                content += (config.extraSpace) ? ' ' : '';
                content += escapedContent;
                content += (config.extraSpace) ? ' ' : '';
                break;
            case 'center':
                content += generateChars(fillerChar, Math.floor(fillLength / 2) );
                content += (config.extraSpace) ? ' ' : '';
                content += escapedContent;
                content += (config.extraSpace) ? ' ' : '';
                content += generateChars(fillerChar, Math.ceil(fillLength / 2) );
                break;
            default: 
                content += (config.extraSpace) ? ' ' : '';
                content += escapedContent;
                content += (config.extraSpace) ? ' ' : '';
                content += generateChars(fillerChar, fillLength)
                break;
        }

        content += (config.border) ? config.placeholder : '';

        return config.prefix + content + config.postfix + '<br />';
    }

    function generateLogs(model) {
        var modelJSON = model.toJSON(),
            output = '',
            lines,
            i;

        lines = modelJSON.input.split('\n');

        if (modelJSON.border) {
            output += makeLine(null, modelJSON);
        }

        for (i = 0; i < lines.length; i++) {
            output += makeLine(lines[i].trim(), modelJSON);
        }


        if (modelJSON.border) {
            output += makeLine(null, modelJSON);
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
