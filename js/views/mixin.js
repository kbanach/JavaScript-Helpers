define(['backbone','underscore', 'jquery'], function(Backbone, _, $) {
    return Backbone.View.extend({

        id: 'home-page',

        initialize: function() {
            console.log('Home view initialized!');
            this.render();
        },

        render: function() {
            var self = this;

            function extend(target) {
                var i, 
                    len,
                    source,
                    prop;

                if (!arguments[1]) {
                    return;
                }

                for (i = 0, len = arguments.length; i < len; i++) {
                    source = arguments[i];

                    for (prop in source) {
                        if (source.hasOwnProperty(prop)) {
                            target[prop] = source[prop];
                        }
                    }
                }

                return target;
            }

            function Person(name) {
                this.name = name;
            }

            function Dog(name) {
                this.name = name;
            }

            var speaker = {
                speak: function() {
                    return this.name + " is speaking.";
                }
            };

            var mover = {
                walk: function() {
                    return this.name + " is walking.";
                },
                run: function() {
                    return this.name + " is running.";
                }
            }; 

            var arithmetic = {
                add: function() {
                    return this.name + " is adding something.";
                },
                multiply: function() {
                    return this.name + " is multipying something.";
                }
            }; 

            // $.extend(Person.prototype, speaker, mover, arithmetic);
            // $.extend(Dog.prototype, speaker, mover);
            
            extend(Person.prototype, speaker, mover, arithmetic);
            extend(Dog.prototype, speaker, mover);

            var johnDoe = new Person('John Doe');
            var fido = new Dog('Fido');

            this.el.innerHTML += johnDoe.speak() + '<br>';
            this.el.innerHTML += johnDoe.walk() + '<br>';
            this.el.innerHTML += johnDoe.run() + '<br>';
            this.el.innerHTML += johnDoe.add() + '<br>';
            this.el.innerHTML += johnDoe.multiply() + '<br>';
            this.el.innerHTML += fido.speak() + '<br>';
            this.el.innerHTML += fido.walk() + '<br>';
            this.el.innerHTML += fido.run() + '<br>';

            return this;
        }
    });
});
