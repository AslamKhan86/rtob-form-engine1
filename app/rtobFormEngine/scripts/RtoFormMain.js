/**
 * Created by Aslam Khan.
*/

'use strict';
angular.module('rtob-form-engine', ['ui.router','config', 'acute.select', 'uiSwitch', 'ui.bootstrap','vesparny.fancyModal']);

angular
  .module('rtob-form-engine')
  .factory('HttpService', HttpService)
  .factory('ServiceURL', ServiceURL)
  .factory('FormData', FormData)
  .factory('ApplicationData', ApplicationData)
  .factory('LovValue', LovValue)
  .service('ErrorDetail', ErrorDetail)
  .directive('rtoTextbox', rtoTextbox)
  .directive('rtoDate', rtoDate)
  .directive('headerMenu', headerMenu)
  .directive('leftMenu', leftMenu)
  .directive('authenticationMenu', authenticationMenu)
  .controller('MainController', MainController)
  .controller('FormRenderer', FormRenderer)
  .controller('ModalController', ModalController)
  .constant('_', window._);

  angular.module('rtob-form-engine').config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $urlRouterProvider.otherwise("home");

  $stateProvider
  .state('home', {
    url           : '/home',
  	templateUrl   : 'rtobFormEngine/scripts/partials/homepage.html',
    controller    : "MainController"
  });

  // use the HTML5 History API
  //$locationProvider.html5Mode(true);
});
