(function () {
    //Defines the module (the app directive in HTML). The array represent other modules used as dependencies
    var app = angular.module("helloApp", []);

    var MainController = function ($scope, $http) {

        /*var person = {
            firstName: "Frederico",
            lastName: "Silva",
            imageSrc: "http://vignette3.wikia.nocookie.net/simpsons/images/b/b0/HomerSimpson5.gif"
        };
        
        $scope.person = person;*/

        //angular will automatically parse the response to a JSON object
        var onUserComplete = function (response) {
            $scope.user = response.data;
        };

        var onError = function (reason) {
            console.log(reason);
            $scope.error = "Could not fetch the user.";
        };

        //returns a promise(starts a request to a server but you don't know exactly when the answer will be available)
        $http.get("https://api.github.com/users/fredssbr")
            .then(onUserComplete, onError);

        $scope.message = "Hello Angular!";
    };

    /*Register the controller in the module
    Parameter name and array of services and function to be called as controller (must be last in the array)    
    */
    app.controller("MainController", ["$scope", "$http", MainController]);
})();