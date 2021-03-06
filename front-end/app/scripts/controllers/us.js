'use strict';
/**
 * @ngdoc function
 * @name disturbometerApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('disturbometerApp')
  .controller('UsCtrl', ['$scope', '$rootScope', 'Ref', '$firebaseArray', '$window',
    function ($scope, $rootScope, Ref, $firebaseArray, $window) {
    $rootScope.activeTab = 'us';
    var allUsers = $firebaseArray(Ref.child('/seedusers'));
    var clonedArray = {};

    allUsers.$loaded(
      function () {
        allUsers.forEach(function (user) {
          var newUser = JSON.parse(JSON.stringify(user));

          // add in missing properties from seed users
          newUser.inOffice = true;
          newUser.status = 'unavailable';
          clonedArray[newUser.email] = newUser;

          // merge in the users profile/ based on their email address

        });
      });
    $scope.users = clonedArray;

    var allProfiles = $firebaseArray(Ref.child('/profile'));
    allProfiles.$loaded()
      .then(function (data) {
        //loop through the profiles
        data.forEach(function (profile) {
          console.log($scope.users[profile.email]);
          $scope.users[profile.email].hasProfile = true;
          $scope.users[profile.email].macAddress = profile.macAddresses;
          $scope.users[profile.email].status = 'unavailable';
        });
      });

    var macAddressList = $firebaseArray(Ref.child('/events/nmapscans').limitToLast(1));

    macAddressList.$watch(function (event) {
      var newEvent = macAddressList.$getRecord(event.key);

      if (newEvent && newEvent.mac_addresses) {
        console.log('nmapscans updated:', newEvent);
        console.log('num nmapscans: ', newEvent.mac_addresses.length);

        $scope.devicesConnected = newEvent.mac_addresses.length;
        $scope.deviceList = newEvent.mac_addresses;
        $scope.lastCheckTime = newEvent.last_seen;

//        console.log('users', $scope.users);
        // go through the users and look for mac addresses
        $window._.each($scope.users, function(user){
          if(typeof user.macAddress !== 'undefined' && user.macAddress !== null){
//            console.log('This user has some mac addresses associated with their account');
            $window._.each(user.macAddress, function(n, key){
              var index = $window._.findIndex($scope.deviceList, 'mac_address', key.toUpperCase());
//              console.log('index:', index);
              if(index !== -1){
                user.status = 'available';
                user.lastSeen = $scope.lastCheckTime;
              }
            });
          }
        });
      }
    });

  }]);
