(function() {
    'use strict';

    var controllerId = 'shell';

    angular
        .module('kx.ux')
        .controller(controllerId, shell);

    shell.$inject = ['centralHub', 'loggingManager'];

    function shell(centralHub, loggingManager) {
        var vm = this;

        initialize();

        function initialize() {
            loggingManager.log(controllerId, 'controller initialization', 'completed!', '');
        }
    }
}());