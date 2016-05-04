(function () {
    'use strict';

    angular
        .module('kx.ux', ['ngSanitize', 'ngMessages', 'ngMaterial', 'kx.msg', 'kx.nav'])
        .config(configure);

    configure.$inject = ['$mdThemingProvider'];

    function configure($mdThemingProvider) {
        $mdThemingProvider.definePalette('KX', {
            '50': '#c5c4d7',
            '100': '#9997b8',
            '200': '#7875a1',
            '300': '#57547b',
            '400': '#4a4769',
            '500': '#3d3b57',
            '600': '#302f45',
            '700': '#232233',
            '800': '#171620',
            '900': '#0a0a0e',
            'A100': '#c5c4d7',
            'A200': '#9997b8',
            'A400': '#4a4769',
            'A700': '#232233',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 A100 A200'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('KX', {
                'default': '600',
                'hue-1': '500',
                'hue-2': '300',
                'hue-3': 'A100'
            })
            .accentPalette('KX');
        $mdThemingProvider.theme('KX')
            .backgroundPalette('KX', {
                'default': '50',
                'hue-1': '100',
                'hue-2': 'A100',
                'hue-3': 'A200'
            });
    }
}());