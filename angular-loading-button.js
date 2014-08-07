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
          transclude: true,
          replace: true,
          scope: {
            fail: '=',
            success: '=',
            value: '='
          },
          template: '\
            <div class="progress-button">\
              <button><span ng-transclude></span></button>\
              <svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>\
            </div>\
          ',
          link: function(scope, element, attr) {
            scope.$watch('value', function(value) {
              $log.info(value);
            });
          }
        };
      }
    ]
  )
;
