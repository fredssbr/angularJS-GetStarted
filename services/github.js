(function(){
    var gitHub = function($http){
        var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                        //The method then returns a finished promise(whether OK or Error)
                        .then(function(response){
                            return response.data;
                        });
        };
        
        var getRepos = function(user){
            return $http.get(user.repos_url)
                //The method then returns a finished promise(whether OK or Error)
                .then(function(response){
                    return response.data;
                });
        };
        
        return{
            getUser: getUser,
            getRepos: getRepos
        }; 
    };
    
    var module = angular.module("gitHubViewer");
    //Registers the service in the module
    module.factory("gitHub", gitHub);
}());