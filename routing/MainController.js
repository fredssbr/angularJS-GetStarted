(function () {
    //Defines the module (the app directive in HTML). The array represent other modules used as dependencies
    var app = angular.module("gitHubViewer");

    var MainController = function ($scope, $interval, $location) {

        $scope.search = function(username){
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);
        };
        
        var decrementCountdown = function(){
            $scope.countdown--;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };
        
        var countdownInterval = null;
        var startCountdown = function(){
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown); 
        };
        
        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
    };

    /*Register the controller in the module
    Parameter name and array of services and function to be called as controller (must be last in the array)    
    */
    app.controller("MainController", ["$scope", "$interval", "$location", MainController]);
})();