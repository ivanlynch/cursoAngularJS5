//Declaramos el nombre del modulo para el todoList!
angular.module("TodoList", ['LocalStorageModule'])

    /* Declaramos el servicio y le pasamos como parámetro un servicio*/
    .service('TodoService', function (localStorageService) {

        /* Definimos las propiedades del objeto */
        this.key = "angular-todolist";

        /* Aca definimos que si ya tiene una key nos devuelva los valores */
        if(localStorageService.get(this.key)){

            this.activities = localStorageService.get(this.key);

        }else{

            /* Si no tiene una key, que inicialice la colección  */
            this.activities = [];
        }

        /* Creamos un método para agregar registros */
        this.add = function (newActividad) {

            /* Acá le hacemos push dentro de nuestra colección  */
            this.activities.push(newActividad);
        };

        /* Definimos un método para que haga un update de la colección */
        this.updateLocalStorage = function () {

          /* le pasamos al local storage la key y las actividades */
          localStorageService.set(this.key, this.activities);
        };

        /* Definimos un motodo para limpiar la memoria */
        this.clean = function () {

          /* Declaramos que el servicio es igual a una coleccion vacia */
            this.activities = [];

          /* Luego de vaciar la coleccion hacemos el update para que quede vacia*/
            this.updateLocalStorage();

          /* Devolvemos la coleccion vacia*/
          return this.getAll();
        };

        /* Pedimos todos los valores de la coleccion */
        this.getAll = function () {
            return this.activities;
        };

        /* Definimos un método para eliminar registros */
        this.remove = function (item) {

            /* A la coleccion de actividades le pasamos la función filter que recibe como parámetro
             una función, a esa función le pasamos como parámetro el nombre de la actividad */
            this.activities = this.activities.filter(function (itemActivity) {
                /* Retorna todo lo que no sea igual a la actividad  */
                return itemActivity !== item;
            });

            /* Updateamos la colección */
            this.updateLocalStorage();

            /* Devolvemos la colección*/
            return this.getAll();
        };

    })

    /* Declaramos el controlador al cual le pasamos el nombre y una funcion que recibe dos parametros
    el primero para definir el alcance y el segundo el servicio*/
    .controller("TodoController", function($scope, TodoService) {

        /* Dentro de la variable $scope le pasamos todos los valores del servicio */
        $scope.todo = TodoService.getAll();
        /* Declaramos un objeto vacio */
        $scope.newActividad = {};

        /* Creamos una función para agregar los valores a la colección*/
        $scope.addActividad = function () {

            /* Guardamos los valores del form en la colección */
            TodoService.add($scope.newActividad);

            /* Vaciamos los datos que recibimos del form */
            $scope.newActividad = {};

        }

        /* Declaramos una funcion la cual recibe un item */
        $scope.removeActivities = function (item) {
            /* Actualizamos la colección sin el valor eliminado */
            $scope.todo =  TodoService.remove(item);
        }

        /* Vaciamos la colección */
        $scope.clean = function () {
            $scope.todo = TodoService.clean();
        }


    });