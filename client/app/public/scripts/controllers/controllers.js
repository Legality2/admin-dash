



app.controller('AuthCtrl', ['$rootScope', '$scope', '$state', 'auth', function($rootScope, $scope, $state, auth){
  $scope.user = {};

  auth.userInfo();
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
  $scope.userInfo = auth.userInfo;
  console.log($scope.userInfo);
  $rootScope.currentUser = auth.currentUser
  $scope.logOut = auth.logOut;
});








app.controller('adminCtrl', function($scope, $http){



  //events admin sect
  $





});

app.controller('bubbleCtrl', function($scope){
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
});
