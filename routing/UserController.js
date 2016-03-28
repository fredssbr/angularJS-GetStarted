(function () {
    //Defines the module (the app directive in HTML). The array represent other modules used as dependencies
    var app = angular.module("gitHubViewer");

    var UserController = function ($scope, gitHub, $routeParams) {

        //angular will automatically parse the response to a JSON object
        var onUserComplete = function (data) {
            $scope.error = "";
            $scope.user = data;
            gitHub.getRepos($scope.user).then(onReposComplete, onError);
        };
        
        var onReposComplete = function(data){
            $scope.repos = data;
        };

        var onError = function (reason) {
            $scope.user = "";
            $scope.error = "Could not fetch the data.";
        };
        
        $scope.username = $routeParams.username;
        $scope.reposOrderBy = "-stargazers_count";
        gitHub.getUser($scope.username).then(onUserComplete, onError);

    };

    /*Register the controller in the module
    Parameter name and array of services and function to be called as controller (must be last in the array)    
    */
    app.controller("UserController", ["$scope", "gitHub", "$routeParams", UserController]);
})();