/*app.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('127.0.0.1:7000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});*/

app.factory('auth', ['$http','$window', '$state', '$localStorage', function($http, $window, $state, $localStorage) {
  var auth = {};
  var storage = $localStorage;
    auth.saveToken = function(token){
     storage.token = token;
    };

    auth.getToken = function(){
      return storage.token;
    };

    auth.userInfo = function(){
     $http.get('/api/auth/memberInfo').success(function(data){
      console.log(data);
      return data;    
      });
    };

    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload;
      }
    };

    auth.currentUserRole = function(){
      var user = auth.currentUser();

      return user.role;
    };

    auth.register = function(user){
      return $http.post('/api/auth/signup', user).success(function(data){
      
        auth.saveToken(data.token);
      });
    };

    auth.logIn = function(user){
      return $http.post('/api/auth/login', user).error(function(){
        console.log('error login in')
      }).success(function(data){
        auth.saveToken(data.token);
      });
    };

    auth.logOut = function(){
    delete storage.token;
    $state.go('login');
  };


  return auth
}]);


//image service
app.service('imgService', ['$resource', function($resource){
        return $resource('/api/img/:id', {}, {
                query: {method: 'GET', isArray: true},
                create: {method: 'POST'},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);


//siteInfo service
app.service('siteService', ['$resource', function($resource){
        return $resource('/api/siteInfo/:id', {}, {
                query: {method: 'GET', isArray: true},
                create: {method: 'POST'},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);






//contact service
app.service('contactService', ['$resource', function($resource){
        return $resource('/api/contact/:id', {}, {
                query: {method: 'GET', isArray: true},
                create: {method: 'POST'},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);



//news service
app.service('newsService', ['$resource', function($resource){
        return $resource('/api/news/:id', {}, {
                query: {method: 'GET', isArray: true},
                create: {method: 'POST'},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);




//event service
app.service('eventService', ['$resource', function($resource){
        return $resource('/api/event/:id', {}, {
                query: {method: 'GET', isArray: true},
                getOne: {method: 'GET', isArray: true, params: {id: '@id'}},
                create: {method: 'POST'},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);






//music service

app.service('musicService', ['$resource', function($resource){
        return $resource('/api/music/:id', {}, {
                query: {method: 'GET', isArray: true},
                create: {method: 'POST'},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);
app.service('siteService', ['$resource', function($resource){
        return $resource('/api/site', {}, {
                query: {method: 'GET', isArray: true},
                create: {method: 'POST'},
           
        });
}]);

app.service('slideService', ['$resource', function($resource){
        return $resource('/api/event/slides/:id', {}, {
                retrieve: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {
                  "Content-Type": "multipart/form-Data"
                }},
                update: {method: 'PUT', params: {id: '@id'}},
                remove: {method: 'DELETE', params: {id: '@id'}}
        });
}]);





