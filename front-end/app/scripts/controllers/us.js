'use strict';
/**
 * @ngdoc function
 * @name disturbometerApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('disturbometerApp')
  .controller('UsCtrl', ['$scope', '$rootScope', 'Ref', '$firebaseArray', function ($scope, $rootScope, Ref, $firebaseArray) {
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

    var allProfiles = $firebaseArray(Ref.child('/profile'))
    allProfiles.$loaded().then(function (data) {
      //loop through the profiles
      data.forEach(function (profile) {
        console.log($scope.users[profile.email]);
        $scope.users[profile.email].hasProfile = true;
        $scope.users[profile.email].macAddress = profile.macAddresses;
        $scope.users[profile.email].status = 'interuptable';
      });
    });


    var macAddressList = $firebaseArray(Ref.child('/events/nmapscans').limitToLast(1));

    macAddressList.$watch(function (event) {
      var newEvent = macAddressList.$getRecord(event.key);

      if (newEvent && newEvent.mac_addresses) {
        console.log(newEvent);
        console.log(newEvent.mac_addresses.length);

        $scope.devicesConnected = newEvent.mac_addresses.length;
        $scope.deviceList = newEvent.mac_addresses;
        $scope.lastCheckTime = newEvent.last_seen;

        // go through the address list and for each mac address
        $scope.deviceList.forEach(function(device){
          console.log('device', device);
          var index = _.findIndex($scope.users, device.mac_address);
          if(index != -1){
            console.log('index', index);
            $scope.users[index].status = 'available';
          }
        });
        // find a profile that contains the mac address
        // update some status

      }
    });

  }]);
