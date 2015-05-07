'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('disturbometerApp')
  .controller('AccountCtrl', ['$scope', '$rootScope', 'user', 'Auth', 'Ref', '$firebaseObject', function($scope, $rootScope, user, Auth, Ref, $firebaseObject) {
    $scope.user = user;
    $scope.logout = function () {
      Auth.$unauth();
    };

    /**
     * Sync google profile with our firebase profile.
     */
    $scope.initProfile = function(){
    // sync the logged in user with their account profile
    $scope.profile.givenName = $scope.user.google.cachedUserProfile.given_name || null;
    $scope.profile.picture = $scope.user.google.cachedUserProfile.picture || null;
    $scope.profile.displayName = $scope.user.google.displayName || null;
    $scope.profile.email = $scope.user.google.email || null;
    $scope.profile.macAddresses = $scope.profile.macAddresses  || null;
    $scope.profile.$save();
    };

    $scope.profile = $firebaseObject(Ref.child('profile/' + user.uid));
    $scope.profile.$loaded()
      .then(function(data) {
        console.log(data);
        $scope.initProfile();
      })
      .catch(function(error){
        console.error('Error:',error);
      });

    console.log($scope.profile.$id);
    /**
     * Mac address management
     */
    $scope.newMacAddressName = '';
    $scope.newMacAddress = '';

    $scope.addMacAddress = function () {
      if (typeof $scope.profile.macAddresses === 'undefined') {
        $scope.profile.macAddresses = {};
      }
      $scope.profile.macAddresses[$scope.newMacAddress] = $scope.newMacAddressName;
      $scope.profile.$save();

      $scope.newMacAddressName = '';
      $scope.newMacAddress = '';
    };

    $scope.removeMacAddress = function (macKey) {
      delete $scope.profile.macAddresses[macKey];
      $scope.profile.$save();
    };

    $rootScope.activeTab = 'account';

  }]);
