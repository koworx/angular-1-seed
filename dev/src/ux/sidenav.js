(function() {
    'use strict';

    var controllerId = 'sidenav';

    angular
        .module('kx.ux')
        .controller(controllerId, sidenav);

    sidenav.$inject = ['$route', 'centralHub', 'loggingManager', 'routingManager', 'config'];

    function sidenav($route, centralHub, loggingManager, routingManager, config) {
        var vm = this;

        vm.Routes = routingManager.getRoutes();
        vm.isCurrent = isCurrent;

        initialize();
        getNavigationRoutes();
        
        function initialize() {
            loggingManager.log(controllerId, 'controller initialization', 'completed!', '');
        }

        function getNavigationRoutes() {
            vm.navRoutes = routingManager.getRoutes().filter(function(route) {
                return route.settings && route.settings.nav && route.settings.quickLaunchEnabled;
            }).sort(function(routeA, routeB) {
                return routeA.settings.nav > routeB.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
}());