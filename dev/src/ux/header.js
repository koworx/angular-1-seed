(function() {
    'use strict';

    var controllerId = 'header';

    angular
        .module('kx.ux')
        .controller(controllerId, header);

    header.$inject = ['centralHub', 'loggingManager', 'config'];

    function header(centralHub, loggingManager, config) {
        var vm = this;

        vm.appUrl = config.appUrl;
        vm.appTitle = config.appTitle;
        vm.pageTitle = "Home";

        initialize();

        function initialize() {
            loggingManager.log(controllerId, 'controller initialization', 'completed!', '');
        }
    }
}());