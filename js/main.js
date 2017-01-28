'use strict';

require.config({
    paths: {
        jquery: "libs/jquery-1.10.2.min",
        "jquery-migrate": "libs/jquery-migrate-1.2.1.min",
        bootstrap: "libs/bootstrap.min",
        modernizr: "libs/modernizr.min",
        toggles: "libs/toggles.min",
        retina: "libs/retina.min",
        "chosen-jquery": "libs/chosen.jquery.min",
        custom: "./custom",
        angular: 'libs/angular.min',
        'ui-router': 'libs/angular-ui-router.min',
        'ng-resource': 'libs/angular-resource.min',
        domReady: 'libs/domReady',
        store: 'libs/store',
        'angular-bootstrap': 'libs/ui-bootstrap-tpls-0.12.0.min',
        underscore: 'libs/underscore',
        mathjax: "//cdn.mathjax.org/mathjax/2.4-latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML&amp;delayStartupUntil=configured",
        'angular-youtube-embed': 'libs/angular-youtube-embed.min',
        highcharts: "libs/highcharts",
        'highcharts-ng': "libs/highcharts-ng.min",
        //"chosen-ng": "libs/chosen.angular",
    },
    waitSeconds: 200,
    shim: {
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'ui-router': {
            deps: ['angular']
        },
        'ng-resource': {
            deps: ['angular']
        },
        jquery: {
            exports: 'jQuery'
        },
        "jquery-migrate": {
            deps: ['jquery']
        },
        "chosen-jquery": {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        },
        toggles: {
            deps: ['jquery']
        },
        custom: {
            deps: ['jquery', 'toggles']
        },
        'angular-bootstrap': {
            deps: ['angular', 'bootstrap']
        },
        underscore: {
            exports: '_'
        },
        mathjax: {
            exports: "MathJax",
            init: function () {
                MathJax.Hub.Config({
                    tex2jax: {
                        skipTags: ["script","noscript","style"],
                        extensions: ["mml2jax.js"]
                    }
                });
                MathJax.Hub.Startup.onload();
                return MathJax;
            }
        },
        'angular-youtube-embed': {
            deps: ['angular']
        },
        highcharts: {
            "exports": "Highcharts",
            "deps": ["jquery"]
        },
        'highcharts-ng': {
            deps: ['angular', 'highcharts']
        },
        /*'chosen-ng': {
            deps: ['angular']
        },*/
    },
    deps: [
        // kick start application... see boot.js
        './boot'
    ]
});