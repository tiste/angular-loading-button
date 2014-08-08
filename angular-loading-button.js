angular.module('loadingButton', [])
  .factory(
    'loadingButton',

    [
      '$log',

      function(
        $log
      ) {
        return {
          dropper: function(v) {
            return this.inc(v, Math.random() * 0.02);
          },

          inc: function(v, amount) {
            v = this.limit(v + amount, 0.05, 0.95);

            return this.set(v);
          },

          limit: function(v, min, max) {
            var r = v;

            if (v < min) {
              r = min;
            }

            if (v > max) {
              r = max;
            }

            return r;
          },

          set: function(v) {
            return this.limit(v, 0.05, 1);
          }
        };
      }
    ]
  )

  .directive(
    'loadingButton',

    [
      '$log',
      '$timeout',
      'loadingButton',

      function(
        $log,
        $timeout,
        loadingButton
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
            var started = false;

            if (typeof scope.value == 'undefined')
              scope.value = 0;

            var start = function() {
              started = true;

              var dropper = function() {
                $timeout(function () {
                  scope.value = loadingButton.dropper(scope.value);
                  dropper();
                }, 500);
              };

              dropper();
            };

            element.bind('click', function() {
              if (!started)
                start();
            });

            scope.$watch('value', function(v) {
              if (v > 0 && !started)
                start();

              $log.info(v);
            });
          }
        };
      }
    ]
  )
;
