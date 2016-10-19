/**
 * Created by ilynch on 19/10/16.
 */
angular.module('CustomDirective')
        .directive('myAutocomplete', function () {
            function  link(scope, element, attrs) {
                $(element).autocomplete({
                    source: scope.$eval(attrs.myAutocomplete),
                    select: function(ev, ui) {
                        ev.preventDefault();
                        if(ui.item){
                            scope.optionSelected(ui.item.value);
                        }
                    },
                    focus: function(ev, ui) {
                        ev.preventDefault();
                        $(this).val(ui.item.label);
                    }
                });
            }

            return {
                link: link
            };

        })
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
        });