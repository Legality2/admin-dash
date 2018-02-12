



app.controller('AuthCtrl', ['$rootScope', '$scope', '$state', 'auth', function($rootScope, $scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
      console.log($scope.error);
    }).then(function(){
      $state.go('admin.task');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('admin.task');
    });
  };
}]);
app.controller('navCtrl', function($rootScope, $scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $rootScope.currentUser = auth.currentUser
  $scope.logOut = auth.logOut;
});





//gallary controller
app.controller('imgCtrl', function($scope, imgService, angularGridInstance){
$scope.images = [];
imgService.query(function(data){
  $scope.images = data;
});

$scope.deleteImg = function(imgId){
  imgService.remove({id: imgId});
  imgService.query(function(data){
    $scope.images = data;
  });
};

});


app.controller('adminCtrl', function($scope, $http){



  //events admin sect
  $





});

app.controller('eventCtrl', function($scope, $http, eventService, $state){
$scope.events = [];
$scope.eventToUpdate = {};
$scope.id = '';
$scope.event = new eventService();

$scope.editEvent = function(id){
  $scope.eventId = id;
}

eventService.getOne({_id: $scope.eventId}, function(data){
var event = [];
event = data;

$scope.eventToUpdate  = angular.copy(event[0]);

});

 $scope.eventUpdate = function(){

 };




eventService.query(function(data){
  $scope.events = data;

});

$scope.deleteEvent = function(event){
  eventService.remove({id: event});
  eventService.query(function(data){
    $scope.events = data;
  });
};



});
app.controller('newsCtrl', function($scope, $http, newsService, $sce){
$scope.news = [];
$scope.News = new newsService();
$scope.recentNews = [];
newsService.query(function(data){
  $scope.news = data;
  

});

$scope.deleteNews = function(event){
  newsService.remove({id: event});
  newsService.query(function(data){
    $scope.news = data;
  });
};



$scope.trustSrc = function(src) {

    var foo = src;

    return $sce.trustAsResourceUrl(foo);
  };

 $scope.updateNews = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
    $scope.News.$update(function() {
      $state.go('admin.music'); // on success go back to home i.e. movies state.
    });

}
});
app.controller('musicDetailsCtrl', function($scope, musicService, $stateParams, ngAudio, mySocket){
$scope.musicId = $stateParams.musicId;
 $scope.music = {};
 var musicPath = '';


  musicService.single({id: $scope.musicId}, function(data){
    $scope.music = data;
    var path = data.track[0].path;
    var pathRes = path.slice(2);
    musicPath = JSON.stringify(pathRes.replace(/\\/g,"/"));

  });


$scope.audio = ngAudio.load(musicPath);


});
app.controller('musicCtrl', function($scope, $http, musicService, $stateParams, $state){
$scope. newMusic = {};
$scope.music = [];
$scope.track = new musicService();

$scope.addPlays = function(id){
    musicService.update({id: id}, function(music){
      music.plays += 1;
      music.$save();
    })
}

/*$scope.testSocket = function(){
  mySocket.emit('music:upload', {songTitle: 'test test', mainArtist: 'test artisit'});
 }
 */

$scope.uploadMusic = function(){
  var formData = new FormData();

    formData.append('songTitle', $scope.newMusic.songTitle);
    formData.append('artistOnSong.mainArtist', $scope.newMusic.mainArtist);
    formData.append('upl', $scope.myFile);
    
    $http.post('/api/music/upload', formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).success(function(){
      alert('data was saved');
      

$state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
});
    }).error(function(){
      alert('an error has occured and data was not saved');
    });

};


musicService.query(function(data){
  $scope.music = data;
});


$scope.listenSrc = function(src){
    var site = 'localhost:7000' + src;

    return site;
}




});


app.controller('msgCtrl', function($scope, contactService, $state){
$scope.messages = [];
$scope.msgAmount = function(){
  return $scope.messages.length;
};

$scope.newMsg = new contactService();

$scope.msgName = function(a, b){
  var name = a + b;
  return name;
};

$scope.sendMsg = function(){
$scope.newMsg.$save(function(){
  $state.go('admin.inquirys');
});
  

};


contactService.query(function(data){
  $scope.messages = data;

})


$scope.deleteMsg = function(msg){
  contactService.remove({id: msg});
  contactService.query(function(data){
    $scope.messages = data;
  });
  $state.go('admin.inquirys');
};



});