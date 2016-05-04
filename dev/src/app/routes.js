(function() {
    'use strict';

    angular
        .module('kx.seed')
        .run(defineRoutes);

    defineRoutes.$inject = ['routingManager'];

    function defineRoutes(routingManager) {
        routingManager.configureRoutes(getRoutes());

        function getRoutes() {
            return [
                {
                    url: '/home',
                    config: {
                        templateUrl: 'app/home.html',
                        title: 'Home',
                        settings: {
                            nav: 3,
                            content: '<i class="fa fa-group"></i> Home',
                            quickLaunchEnabled: true
                        }
                    }
                }
            ];
        }
    }
}());
