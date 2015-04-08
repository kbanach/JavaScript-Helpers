define(['backbone','underscore', 'jquery'], function(Backbone, _, $) {
    return Backbone.View.extend({

        id: 'home-page',

        initialize: function() {
            console.log('Home view initialized!');
            this.render();
        },

        render: function() {
            this.el.innerHTML = "<h2>Hello, feel your self like Home!</h2>";
            return this;
        }
    });
});
