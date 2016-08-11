import './angular-loading-button.css';

(function () {
    'use strict';

    angular.module('ngLoadingButton', [])
        .factory('_loadingButton', _loadingButton)
        .directive('loadingButton', loadingButton);

    function _loadingButton() {
        return {
            dropper: function (v) {
                return this.inc(v, Math.random() * 0.1);
            },

            inc: function (v, amount) {
                v = this.limit(v + amount, 0.05, 0.95);

                return this.set(v);
            },

            limit: function (v, min, max) {
                let r = v;

                if (v < min) {
                    r = min;
                }

                if (v > max) {
                    r = max;
                }

                return r;
            },

            set: function (v) {
                return this.limit(v, 0.05, 1);
            }
        };
    }

    function loadingButton($interval, $timeout, _loadingButton) {
        'ngInject';

        return {
            restrict: 'A',
            scope: {
                completed: '=lbCompleted',
                value: '=?lbValue',
            },
            link: function (scope, element) {
                if (typeof scope.value === 'undefined') {
                    scope.value = 0;
                }

                let dropper;
                let started = false;

                const start = function () {
                    started = true;
                    element.addClass('loading');

                    if (scope.value !== 1) {
                        dropper = $interval(
                            function () {
                                if (scope.value < 0.95) {
                                    scope.value = _loadingButton.dropper(scope.value);
                                }
                            }, 500
                        );
                    }
                };

                const done = function (success) {
                    scope.completed = undefined;
                    scope.value = 1;

                    $interval.cancel(dropper);

                    $timeout(function () {
                        element.removeClass('loading');

                        if (success) {
                            element.addClass('success');
                        }
                        else {
                            element.addClass('error');
                        }
                    }, 400);

                    $timeout(function () {
                        element.removeClass('success error');
                        started = false;
                        scope.value = 0;
                    }, 3000);
                };

                element.bind('click', function () {
                    if (!started) {
                        start();
                    }
                });

                scope.$watch('completed', function (success) {
                    if (success === true) {
                        done(true);
                    }
                    else if (success === false) {
                        done(false);
                    }
                });

                scope.$watch('value', function (v) {
                    if (v > 0 && !started) {
                        start();
                    }
                });
            },
        };
    }
})();
