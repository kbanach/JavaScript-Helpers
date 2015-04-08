require.config({
    baseUrl: './js',

    deps: ['main'], // this is where app is loaded
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },

    paths: {},

    packages: [
        {
            name: 'text',
            location: 'libs/require',
            main: 'text'
        },
        {
            name: 'underscore',
            location: 'libs/underscore',
            main: 'underscore'
        },
        {
            name: 'backbone',
            location: 'libs/backbone',
            main: 'backbone'
        },
        {
            name: 'jquery',
            location: 'libs/jquery',
            main: 'jquery-2.1.3'
        },
        {
            name: 'dotjs',
            location: 'libs/dot',
            main: 'dot.min'
        }
    ]
});

require(['main'], function(Main) {
    var App = new Main();
    console.dir(App);
});


