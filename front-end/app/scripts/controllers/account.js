'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('disturbometerApp')
  .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject) {
    $scope.user = user;
    $scope.logout = function () {
      Auth.$unauth();
    };
    $scope.profile = $firebaseObject(Ref.child('users/' + user.uid));

    /**
     * Sync google profile with our firebase profile.
     */

    // sync the logged in user with their account profile
    $scope.profile.givenName = $scope.user.google.cachedUserProfile.given_name || null;
    $scope.profile.picture = $scope.user.google.cachedUserProfile.picture || null;
    $scope.profile.displayName = $scope.user.google.displayName || null;
    $scope.profile.email = $scope.user.google.email || null;
    $scope.profile.macAddresses = $scope.profile.macAddresses  || null;

    /**
     * Mac address management
     */
    $scope.newMacAddressName = '';
    $scope.newMacAddress = '';

    $scope.addMacAddress = function () {
      if (typeof $scope.profile.macAddresses === 'undefined') {
        $scope.profile.macAddresses = {};
      }
      $scope.profile.macAddresses[$scope.newMacAddressName] = $scope.newMacAddress;
      $scope.newMacAddressName = '';
      $scope.newMacAddress = '';
      $scope.profile.$save();
    };

    $scope.removeMacAddress = function (macKey) {
      delete $scope.profile.macAddresses[macKey];
      $scope.profile.$save();
    };
  });
