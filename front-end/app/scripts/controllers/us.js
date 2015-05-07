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
  .controller('UsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
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
      
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
//    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(10));

    // display any errors
//    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
//    $scope.addMessage = function(newMessage) {
//      if( newMessage ) {
//        push a message to the end of the array
//        $scope.messages.$add({text: newMessage})
//          display any errors
//          .catch(alert);
//      }
//    };

//    function alert(msg) {
//      $scope.err = msg;
//      $timeout(function() {
//        $scope.err = null;
//      }, 5000);
//    }


console.log('here!!!');
  }]);
