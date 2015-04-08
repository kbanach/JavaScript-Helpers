define(['backbone','underscore', 'jquery'], function(Backbone, _, $) {
    return Backbone.View.extend({

        id: 'home-page',

        initialize: function() {
            console.log('Home view initialized!');
            this.render();
        },

        render: function() {
            var self = this;

            function Beverage (name, temperature) {
                this.name = name;
                this.temperature = temperature;
            }

            Beverage.prototype.drink = function() {
                self.el.innerHTML += "I'm drinking " + this.name;
            };

            function Coffee(type) {
                Beverage.call(this, "coffee", "hot");
                this.type = type;
            }

            Coffee.prototype = Object.create(Beverage.prototype);
            Coffee.prototype.sip = function() {
                self.el.innerHTML += "Sipping is awesome " + this.type + ' ' + this.name;
            };
            
            var water = new Beverage('water', 'cold');
            var coffee = new Coffee('bold dark roast');

            this.el.innerHTML = "";
            
            
            water.drink();
            this.el.innerHTML += "<br>";
            coffee.drink();
            this.el.innerHTML += "<br>";
            coffee.sip();


            console.log('...and even rendered!', this);
            return this;
        }
    });
});
