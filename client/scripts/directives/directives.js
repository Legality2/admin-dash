app.directive('backImg', function(){
		return function(scope, element, attrs){
			var url = attrs.backimg;
			element.css({
				'background-image': 'url:('+ url +')',
				'background-size': 'cover'
				
			});
		};
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);