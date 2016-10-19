/**
 * Created by ilynch on 19/10/16.
 */
angular.module("CustomDirective", ["ngRoute"])
    .config(function ($routeProvider) {
       $routeProvider
           .when("/", {
               controller: "ReposController",
               templateUrl: "templates/home.html"
           })
           .when('/repo/:name', {
               controller: "RepoController",
               templateUrl: "templates/repo.html"
           })
    });