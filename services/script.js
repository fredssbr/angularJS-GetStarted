(function () {
    //Defines the module (the app directive in HTML). The array represent other modules used as dependencies
    var app = angular.module("gitHubViewer", []);

    var MainController = function ($scope, $interval, $log, $anchorScroll, $location, gitHub) {

        /*var person = {
            firstName: "Frederico",
            lastName: "Silva",
            imageSrc: "http://vignette3.wikia.nocookie.net/simpsons/images/b/b0/HomerSimpson5.gif"
        };
        
        $scope.person = person;*/

        //angular will automatically parse the response to a JSON object
        var onUserComplete = function (data) {
            $scope.error = "";
            $scope.user = data;
            gitHub.getRepos($scope.user)
                .then(onReposComplete, onError);
        };
        
        var onReposComplete = function(data){
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        var onError = function (reason) {
            $scope.user = "";
            console.log(reason);
            $scope.error = "Could not fetch the data.";
        };

        $scope.search = function(username){
            $log.info("Searching for " + username);
            //returns a promise(starts a request to a server but you don't know exactly when the answer will be available)
            gitHub.getUser(username)
                .then(onUserComplete, onError);
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
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
        $scope.message = "GitHub Viewer";
        $scope.reposOrderBy = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();
    };

    /*Register the controller in the module
    Parameter name and array of services and function to be called as controller (must be last in the array)    
    */
    app.controller("MainController", ["$scope", "$interval", "$log", "$anchorScroll", "$location", "gitHub", MainController]);
})();