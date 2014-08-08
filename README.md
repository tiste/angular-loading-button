# angular-loading-button

Loading button directive for AngularJS.

## Installation

`bower install angular-loading-button --save`

## Usage

Inject module into you app:

```javascript
angular.module('YourAwesomeApp', ['loadingButton']);
```

Use it at a [directive](http://docs.angularjs.org/guide/directive):

```html
<div class="btn btn-success" loading-button lb-completed="isSuccess">
```

You can also provide a `lb-value` tag to act on your button (e.g. `height`, `background`...).

Then, simply set the `$scope.isSuccess` to `true` or `false`, or change the `lb-value` to update the loader e.g.

```javascript
$http.post('/contact', data).success(
  function() {
    $scope.isSuccess = true;
  }
).error(
  function() {
    $scope.isSuccess = false;
  }
);
```

The css classes life-cycle will be `loading`, `error` and `success`. It's up to you to customize ([here is](http://angular-loading-button.tiste.io) an example coming from [this](http://tympanus.net/Tutorials/CircularProgressButton/) awesome Codrops article).

## Contributing

1. [Fork it](http://github.com/tiste/angular-loading-button/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

**NB**: mind generated files (e.g. `angular-loading-button.min.js`)
