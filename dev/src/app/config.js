(function() {
    'use strict';

    var events = {
        appBusy: 'app.busy',
        appReady: 'app.ready',
        digestReady: 'digest.ready',
        ctrlReady: 'ctrl.ready'
    };

    var config = {
        appTitle: 'KOWORX Seed',
        appUrl: 'http://localhost:3333',
        version: '1.0.0.0',
        events: events,
        appErrorPrefix: 'ERROR:',
        showInfoNotifications: false
    };

    angular.module('kx.seed')
        .constant('config', config)
        .constant('_', window.Lazy)
        .constant('xxh', window.XXH)
        .config(configure);

    configure.$inject = ['$routeProvider', '$logProvider', 'globalConfigProvider', 'routingConfigProvider', 'exceptionConfigProvider'];

    function configure($routeProvider, $logProvider, globalConfigProvider, routingConfigProvider, exceptionConfigProvider) {
        configureBase();
        configureRouting();
        configureLogging();
        configureExceptionHandling();

        function configureRouting() {
            routingConfigProvider.values.$routeProvider = $routeProvider;
            routingConfigProvider.values.appTitle = '';
            routingConfigProvider.values.resolveAlways = {
                //ready: ['datacontext', function(datacontext) {
                //        return datacontext.ready();
                //    }
                //]
            };
        }

        function configureLogging() {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configureBase() {
            globalConfigProvider.values.appHomeUrl = config.appHomeUrl;
            globalConfigProvider.values.appBusyEvent = config.events.appBusy;
            globalConfigProvider.values.appReadyEvent = config.events.appReady;
            globalConfigProvider.values.digestReadyEvent = config.events.digestReady;
            globalConfigProvider.values.ctrlReadyEvent = config.events.ctrlReady;
        }

        function configureExceptionHandling() {
            exceptionConfigProvider.values.appErrorPrefix = config.appErrorPrefix;
        }
    }
}());