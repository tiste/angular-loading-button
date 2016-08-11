# angular-loading-button

Loading button directive for AngularJS

## Install

`$ npm install -SE angular-loading-button`

Add it as an angular dependency:

```js
angular.module('app', [
    'ngLoadingButton',
]);
```

## Usage

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

## Build

Just run `npm run dev` to start webserver, and build everything with `npm run build`

## Want to help?

1. [Fork it](https://github.com/tiste/angular-query-builder/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes using [commitizen](https://github.com/commitizen/cz-cli) (`git commit -am 'feat: add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT](https://github.com/tiste/angular-query-builder/blob/master/LICENCE)
