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
            return this.inc(v, Math.random() * 0.1);
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
          restrict: 'A',
          scope: {
            completed: '=lbCompleted',
            value: '=?lbValue',
            completedDelay: '=?lbCompletedDelay',
            resetDelay: '=?lbResetDelay'
          },
          link: function(scope, element, attr) {
            if (typeof scope.value === 'undefined')
              scope.value = 0;

            if (typeof scope.completedDelay === 'undefined')
              scope.completedDelay = 400;

            if (typeof scope.resetDelay === 'undefined')
              scope.resetDelay = 3000;

            var dropper,
                started = false;

            var start = function() {
              started = true;
              element.addClass('loading');

              if (scope.value !== 1) {
                dropper = $interval(
                  function() {
                    if (scope.value < 0.95) {
                      scope.value = loadingButton.dropper(scope.value);
                    }
                  }, 500
                );
              }
            };

            var done = function(success) {
              scope.completed = undefined;
              scope.value     = 1;

              $interval.cancel(dropper);

              $timeout(function() {
                element.removeClass('loading');

                if (success) {
                  element.addClass('success');
                } else {
                  element.addClass('error');
                }
              }, scope.completedDelay);

              $timeout(function() {
                element.removeClass('success error');
                started     = false;
                scope.value = 0;
              }, scope.resetDelay);
            };

            element.bind('click', function() {
              if (!started)
                start();
            });

            scope.$watch('completed', function(success) {
              if (success == true) {
                done(true);
              } else if (success == false) {
                done(false);
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
