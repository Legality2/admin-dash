var app = angular.module('adminApp', ['ui.router', 'ngStorage', 'ngResource', 'angular-jwt']);




app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise("/login");

$httpProvider.interceptors.push(['$q', '$location', '$window', '$localStorage', function($q, $location, $window, $localStorage) {
   return {
       'request': function (config) {
           config.headers = config.headers || {};
           if ($localStorage['here4reason']) {
               config.headers.Authorization = 'Bearer ' + $localStorage['here4reason'];
           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
               $location.path('/login');
           }
           return $q.reject(response);
       }
   };
}]);





    $stateProvider
    .state("admin", {
      abstract: true,
      url: '/admin',
      templateUrl: '/views/main-dash.html',
      controller: 'adminCtrl',
      data: {
        grantAccessTo: ['Admin']
      }
    }).state("admin.task", {
       url: '/task',
       templateUrl: '/views/dash-task.html',
       controller: 'adminCtrl',
       authenticate: true
    }).state("admin.events",{
       url: '/events',
       templateUrl: '/views/adminViews/adminEvents.html',
       authenticate: true
    }).state('admin.eventEdit', {
        url: '/events/:id'
    }).state("admin.images", {
        url: '/images',
        templateUrl: '/views/adminViews/adminGallary.html',
        authenticate: true
    }).state("admin.inquirys", {
        url: '/inquirys',
        templateUrl: '/views/adminViews/adminInquirys.html',
        authenticate: true
    }).state("music", {
      url: '/music',
      templateUrl: '/views/musicViews/music.html',
      controller: 'musicCtrl',
      skipAuthorization: true
    }).state("musicInfo", {
      url: '/music/info',
      templateUrl: '/views/musicViews/musicDetails.html',
      skipAuthorization: true
    })
    .state("home", {
        url: '/home',
        templateUrl: '/views/home.html',
        skipAuthorization: true
    }).state("gallary", {
        url: '/gallary',
        templateUrl: '/views/gallary.html',
        controller: 'imgCtrl',
        skipAuthorization: true
    })
    .state("contactUs", {
        url: '/contactUs',
        templateUrl: '/views/contactUs.html',
        controller: 'msgCtrl',
        skipAuthorization: true
    }).state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('admin.task');
        }
      }]
    }).state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('admin.task');
        }
      }]
    });
}).run(function ($rootScope, $state, auth) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParam, fromState) {
      if(!auth.isLoggedIn()){
      	var noAuthroutes = ['login', 'register'];
      	noAuthroutes.forEach(function(element) {
		  console.log(element);
	
        if (next.name !== element ){
          event.preventDefault();
        }
        });
      }
    });
  });
