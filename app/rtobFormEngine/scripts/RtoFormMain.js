/**
 * Created by Aslam Khan.
*/

'use strict';
angular.module('rtob-form-engine', ['ui.router','config', 'uiSwitch', 'ui.bootstrap','vesparny.fancyModal', 'ui.select', 'ngSanitize']);


angular
  .module('rtob-form-engine')
  .factory('HttpService', HttpService)
  .factory('ServiceURL', ServiceURL)
  .factory('ApplicationData', ApplicationData)
  .factory('ApplicationService', ApplicationService)
  .factory('MandatoryCheck', MandatoryCheck)
  .factory('LovValue', LovValue)
  .factory('RefData', RefData)
  .service('ErrorDetail', ErrorDetail)
  .service('FormData', FormData)
  .directive('rtoTextbox', rtoTextbox)
  .directive('rtoDate', rtoDate)
  .directive('rtoMobile', rtoMobile)
  .directive('rtoSelect', rtoSelect)
  .directive('rtoMultiSelect', rtoMultiSelect)
  .directive('rtoCheckbox', rtoCheckbox)
  .directive('rtoToggle', rtoToggle)
  .directive('rwbForm', rwbForm)
  .directive('rwbStage', rwbStage)
  .directive('rwbPage', rwbPage)
  .directive('headerMenu', headerMenu)
  .directive('leftMenu', leftMenu)
  .directive('footerText', footerText)
  .directive('customUnselect', customUnselect)
  .controller('MainController', MainController)
  .controller('FormController', FormController)
  .controller('ModalController', ModalController)
  .controller('ErrorController', ErrorController)
  .controller('SaveController', SaveController)
  .constant('isCordova', window.cordova)
  .controller('StageController', StageController)
  .service('StageData', StageData)
  .controller('PageController', PageController)
  .service('PageData', PageData)
  .controller('StageController', StageController)
  .service('StageData', StageData)
  .controller('PageController', PageController)
  .service('PageData', PageData)
  .controller('FormRenderer', FormRenderer)
  .constant('_', window._);

  angular.module('rtob-form-engine').config(function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider){

  $qProvider.errorOnUnhandledRejections(false);
  $urlRouterProvider.otherwise("home");

  $stateProvider
  .state('home', {
    url           : '/home',
  	templateUrl   : 'rtobFormEngine/scripts/partials/homepage.html',
    controller    : "MainController"
  });
});
