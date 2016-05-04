(function() {
    'use strict';

    var controllerId = 'busy';

    angular
        .module('kx.ux')
        .controller(controllerId, busy);

    busy.$inject = ['$rootScope', '$mdDialog', 'centralHub', 'loggingManager', 'config'];

    function busy($rootScope, $mdDialog, centralHub, loggingManager, config) {
        var vm = this;

        $rootScope.$on(config.events.appBusy, 
            function(event, data) {
                loggingManager.log(controllerId, 'busy indicator', 'ON', '');
                $mdDialog.show({
                    templateUrl: 'busyMaterial',
                    parent: angular.element(document.body)
                })
            });
        
        $rootScope.$on(config.events.appReady, 
            function(event, data) {
                loggingManager.log(controllerId, 'busy indicator', 'OFF', '');
                $mdDialog.cancel();
            });
    }
}());