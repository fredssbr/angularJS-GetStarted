(function () {
    //Defines the module (the app directive in HTML). The array represent other modules used as dependencies
    var app = angular.module("gitHubViewer");

    var RepoController = function ($scope, gitHub, $routeParams) {
        
        var onRepoDetailsComplete = function(data){
            $scope.repo = data;
            gitHub.getRepoContributors($scope.repo).then(onRepoContributors, onError);
        };
        
        var onRepoContributors = function(data){
            $scope.contributors = data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data.";
        };
        
        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        gitHub.getRepoDetails($scope.username, $scope.reponame).then(onRepoDetailsComplete, onError);

    };

    /*Register the controller in the module
    Parameter name and array of services and function to be called as controller (must be last in the array)    
    */
    app.controller("RepoController", ["$scope", "gitHub", "$routeParams", RepoController]);
})();