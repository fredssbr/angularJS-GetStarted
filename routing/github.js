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
        
        var getRepoDetails = function(username,reponame){
            return $http.get("https://api.github.com/repos/" + username + "/" + reponame)
                        .then(function(response){
                            return response.data;
                        });
        };
        
        var getRepoContributors = function(repo){
            return $http.get(repo.contributors_url)
                        .then(function(response){
                            return response.data;
                        });
        };
        
        //A function that gets everything from Repo and Contributors
        var getRepoAll = function(username,reponame){
            var repo;
            return $http.get("https://api.github.com/repos/" + username + "/" + reponame)
                        .then(function(response){
                            repo = response.data;
                            return $http.get(repo.contributors_url);
                        })
                        .then(function(response){
                            repo.contributors = response.data;
                            return repo;
                        });
        };
        
        return{
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails,
            getRepoContributors: getRepoContributors
        };
    };
    
    var module = angular.module("gitHubViewer");
    //Registers the service in the module
    module.factory("gitHub", gitHub);
}());