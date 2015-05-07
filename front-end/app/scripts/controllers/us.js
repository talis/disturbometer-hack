'use strict';
/**
 * @ngdoc function
 * @name disturbometerApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('disturbometerApp')
//  .controller('UsCtrl', ['$scope', '$rootScope', 'Ref', '$firebaseArray', '$timeout', function ($scope, $rootScope, Ref, $firebaseArray, $timeout) {
  .controller('UsCtrl', ['$scope', '$rootScope', 'Ref', '$firebaseArray', function ($scope, $rootScope, Ref, $firebaseArray) {
    var users = [
            {   'name'  : 'Russell Hill',
                'email' : 'rh@talis.com',
                'status': 'available',
                'inOffice' : true},  
            {   'name'  : 'Tim Hodson',
                'email' : 'tim.hodson@talis.com',
                'status': 'unavailable',
                'inOffice' : true},  
            {   'name'  : 'Jeremy Baines',
                'email' : 'jeremy.baines@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Mark Wallsgrove',
                'email' : 'mw@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Matt Moran',
                'email' : 'mm@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Arunn Ramadoss',
                'email' : 'ar@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Nigel Ashworth',
                'email' : 'nigel.ashworth@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Nadeem Shabir',
                'email' : 'ns@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Richard Gubby',
                'email' : 'rg@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Richard Tattersall',
                'email' : 'rt@talis.com',
                'status': 'disturbable',
                'inOffice' : true},  
            {   'name'  : 'Chris Clarke',
                'email' : 'cc@talis.com',
                'status': 'disturbable',
                'inOffice' : true}  
    ];
      
    console.log(users);
    
    $rootScope.activeTab = 'us';
    
    $scope.users = users;
      
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
