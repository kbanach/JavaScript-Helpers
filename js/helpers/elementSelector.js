define([], function () {
    return function(elementToSelect) {
        if (elementToSelect instanceof HTMLElement) {

            /**
             * code copied from: http://goo.gl/N2cvkS
             */
            if (document.body.createTextRange) { // ms
                var range = document.body.createTextRange();
                range.moveToElementText(elementToSelect);
                range.select();
            } else if (window.getSelection) { // moz, opera, webkit
                var selection = window.getSelection();            
                var range = document.createRange();
                range.selectNodeContents(elementToSelect);
                selection.removeAllRanges();
                selection.addRange(range);
            }

            return true;
        } else {
            throw new Error('You can select only HTMLElement');
        }
    };
});