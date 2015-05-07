'use strict';

/**
 * @ngdoc function
 * @name disturbometerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the disturbometerApp
 */
angular.module('disturbometerApp')
  .controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $rootScope.activeTab = 'main';
  }]);
