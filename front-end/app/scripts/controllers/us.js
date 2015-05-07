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
    var allUsers = $firebaseArray(Ref.child('/seedusers'));
    var clonedArray = [];
    
    allUsers.$loaded(
        function() {
            allUsers.forEach(function(user) {
                var newUser = JSON.parse(JSON.stringify(user));

                // add in missing properties from seed users               
                newUser.inOffice = true;
                newUser.status = 'available'; 
                clonedArray.push(newUser);
            });
    });
            
    $rootScope.activeTab = 'us';
    
    $scope.users = clonedArray;
      
    var list = $firebaseArray(Ref.child('/events/nmapscans').limitToLast(1));
    
    list.$watch(function(event) {
      var newEvent = list.$getRecord(event.key);
      
      if (newEvent && newEvent.mac_addresses) {
          console.log(newEvent);
          console.log(newEvent.mac_addresses.length);
          
          $scope.devicesConnected = newEvent.mac_addresses.length;
          $scope.deviceList = newEvent.mac_addresses;
          $scope.lastCheckTime = newEvent.last_seen;
      }
    });

  }]);
