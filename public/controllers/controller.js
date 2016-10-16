angular.module('CustomDirective', [])
    /*
      Nota: Por convención cuando creamos una directiva usando camelcase
            la mayúscula representa donde va a ir el guión
            ej: backImg = back-img
                estaEsUnaDirectiva = esta-es-una-directiva
    */
    // Declaramos la directiva backImg
    .directive('backImg', function () {
        /*
            Retornamos una función la cual toma como parametro
            el $scope, el elemento en este caso seria el div y los atributos
         */
        return function (scope, element, attrs) {
            /*
                declramos en el atributo que observe la directiva y
                en la segunda funcion vamos a tomar el valor en este caso de la url
                y le declaramos que en esta directiva va a usar tales atributos
             */
            attrs.$observe('backImg', function (value) {
                element.css({
                    'background': 'url('+value+')',
                    'background-size': 'cover',
                    'background-position': 'center'
                });
            });
        }
    })
    /*
        Declaramos el controlador AppCtrl y le pasamos como segundo parámetro una funcion
        a la cual le vamos a pasar el $scope para definir el alcance de los datos y $http para hacer la peticion
        a la API de GitHub
     */
    .controller('AppCtrl', function ($scope, $http) {
        /*
            Hacemos uso del método GET para obtener el json de la api de GitHub
         */
        $http.get('https://api.github.com/users/ivanlynch/repos')
        /*
                El metodo GET tiene promises por lo tanto usa Success para decir que si trae valores
                le pasamos una funcion con la variable data que serian los valores que vamos a obtener de la api
                y la guardamos en una variable Repos local.
             */
            .success(function (data) {
                $scope.repos = data;
            })
            /*
                En caso de error le decimos que nos muestre en consola el error.
             */
            .error(function (error) {
                console.log(error);
            })

    });