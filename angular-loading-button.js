angular.module('loadingButton', [])
  .directive(
    'loadingButton',

    [
      '$log',

      function(
        $log
      ) {
        return {
          restrict: 'E',
          scope: {},
          link: function(scope, element, attr) {}
        };
      }
    ]
  )
;
