const app = angular.module("adminApp",['cgNotify', 'ui.router'])

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");

    $stateProvider
    .state("home", {
        url: '/home',
        templateUrl: '/views/main-dash.html',
        controller: 'storeCtrl'
    }).state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
         
        }
      }]
    }).state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
         ;
        }
      }]
    });
});

function skipIfAuth($q, $state,
Auth){
  var defer = $q.defer();
  if(Auth.isLoggedIn()){
    defer.reject();
  } else {
    defer.resolve();
  }
  return defer.promise;
}

function redirectIfNotAuth($q, $state, Auth) {
  var defer = $q.defer();
  if(!Auth.isLoggedIn()) {
    defer.resolve(); /* (3) */
  } else {
    $timeout(function () {
      $state.go('login'); /* (4) */
    });
    defer.reject();
  }
  return defer.promise;
}
app.run(function($rootScope, $state){

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  if (toState.authenticate && !Auth.isLoggedIn()){
    // User isn’t authenticated
    $state.transitionTo('login');
    event.preventDefault();
  }
  if (Auth.currentUser().role !== 'Admin') {
    $state.transitionTo('home');
  }
});


})

app.controller('notifCtrl', function($scope, notify) {


});