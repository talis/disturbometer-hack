angular.module('disturbometerApp')
    .directive('userDisplay', [function() {
        'use strict';

        return {
            restrict: 'A',
            scope: {
                user: '='
            },
            controller: ['$scope', function($scope) {
                var emailBits = $scope.user.email.split('@');
                $scope.user.imageSrc = emailBits[0];
            }],
            templateUrl: 'views/userDisplay.html'
        };
    }]);