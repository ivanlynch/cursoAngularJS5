angular.module('CustomDirective', [])
    .controller('AppCtrl', function ($scope, $http) {
        $http.get('https://api.github.com/users/ivanlynch/repos')
            .success(function (data) {
                $scope.repos = data;
            })
            .error(function (error) {
                console.log(error);
            })

    });