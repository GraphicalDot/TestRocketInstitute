define([
    'require',
    'angular',
    'app',
    'routes',
    'jquery',
    'store',
    'underscore',
    'bootstrap',
    'custom',
    'chosen-jquery',
    //'bootstrap-timepicker'
], function (require, ng, app, routes, $, store, _) {
    'use strict';

    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */
   
        window.hideLoader = function() {
            // Page Preloader
            $('#status').fadeOut();
            $('#preloader').delay(50).fadeOut(function(){
                $('body').delay(50).css({'overflow':'visible'});
            });
        };

        window.showLoader = function() {
            // Page Preloader
            $('#status').fadeIn();
            $('#preloader').show();
            $('body').css({'overflow':'visible'});
        };

        window.jQuery = $;

        $(window).load(hideLoader);
    
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});