(function () {
    'use strict';

    var controllerId = 'home';

    angular
        .module('kx.seed')
        .controller(controllerId, home);

    home.$inject = ['loggingManager'];

    function home(loggingManager) {
        var vm = this;

        initialize();

        function initialize() {
            loggingManager.log(controllerId, 'controller initialization', 'completed!', '');
        }
    }
}());