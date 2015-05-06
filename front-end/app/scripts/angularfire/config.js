angular.module('firebase.config', [])
  .constant('FBURL', 'https://disturbometer.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])

  .constant('loginRedirectPath', '/login');
