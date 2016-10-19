angular.module('CustomDirective')
    /*
      Nota: Por convención cuando creamos una directiva usando camelcase
            la mayúscula representa donde va a ir el guión
            ej: backImg = back-img
                estaEsUnaDirectiva = esta-es-una-directiva
    */

    /*
        Declaramos el controlador AppCtrl y le pasamos como segundo parámetro una funcion
        a la cual le vamos a pasar el $scope para definir el alcance de los datos y $http para hacer la peticion
        a la API de GitHub
     */
    .controller('ReposController', function ($scope, $http) {
        /*
            Hacemos uso del método GET para obtener el json de la api de GitHub
         */
        $scope.repos = [];
        $http.get('https://api.github.com/users/twitter/repos')
        /*
                El metodo GET tiene promises por lo tanto usa Success para decir que si trae valores
                le pasamos una funcion con la variable data que serian los valores que vamos a obtener de la api
                y la guardamos en una variable Repos local.
             */
            .success(function (data) {
                $scope.posts = data;
                for(var i = data.length - 1; i >= 0; i--){
                    var repo = data[i];
                    $scope.repos.push(repo.name);
                }
            })
            /*
                En caso de error le decimos que nos muestre en consola el error.
             */
            .error(function (error) {
                console.log(error);
            });


        $scope.optionSelected = function (data) {

            $scope.$apply(function () {
                $scope.main_repo = data;
            })
        }

    })

    .controller("RepoController", function ($scope, $http, $routeParams){
        $scope.repo = {};
        $http.get('https://api.github.com/repos/twitter/'+$routeParams.name)

            .success(function (data) {
                $scope.repo = data;

            })
            /*
             En caso de error le decimos que nos muestre en consola el error.
             */
            .error(function (error) {

            });

    });