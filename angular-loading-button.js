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
      '$interval',
      '$timeout',
      'loadingButton',

      function(
        $log,
        $interval,
        $timeout,
        loadingButton
      ) {
        return {
          restrict: 'E',
          transclude: true,
          replace: true,
          scope: {
            completed: '=',
            error: '=',
            success: '=',
            value: '='
          },
          template: '\
            <div class="progress-button">\
              <button>\
                <span class="default" ng-transclude></span>\
                <span class="error">{{error}}</span>\
                <span class="success">{{success}}</span>\
              </button>\
              <svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>\
            </div>\
          ',
          link: function(scope, element, attr) {
            if (typeof scope.value === 'undefined')
              scope.value = 0;

            var dropper,
                started = false;

            var start = function() {
              started = true;
              element.addClass('loading');

              dropper = $interval(
                function() {
                  if (scope.value < 0.95) {
                    scope.value = loadingButton.dropper(scope.value);
                  }
                }, 500
              );
            };

            var done = function(success) {
              scope.completed = undefined;
              scope.value     = 1;

              $interval.cancel(dropper);
              element.removeClass('loading');

              if (success) {
                element.addClass('success');
              } else {
                element.addClass('error');
              }

              $timeout(function() {
                element.removeClass('success error');
                started     = false;
                scope.value = 0;
              }, 2000);
            };

            element.bind('click', function() {
              if (!started)
                start();
            });

            scope.$watch('completed', function(success) {
              if (started) {
                if (success == true) {
                  done(true);
                } else if (success == false) {
                  done(false);
                }
              } else {
                scope.completed = undefined;
              }
            });

            scope.$watch('value', function(v) {
              if (v > 0 && !started)
                start()
            });
          }
        };
      }
    ]
  )
;
