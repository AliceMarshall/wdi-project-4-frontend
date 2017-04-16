angular
  .module('borrowApp')
  .config(Router);

Router.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];
function Router($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('itemsIndex', {
      url: '/items',
      templateUrl: 'js/views/items/index.html',
      controller: 'ItemsIndexCtrl as itemsIndex'
    })
    .state('itemsNew', {
      url: '/items/new',
      templateUrl: 'js/views/items/new.html',
      controller: 'ItemsNewCtrl as itemsNew'
    })
    .state('itemsShow', {
      url: '/items/:id',
      templateUrl: 'js/views/items/show.html',
      controller: 'ItemsShowCtrl as itemsShow'
    })
    .state('itemsEdit', {
      url: '/items/:id/edit',
      templateUrl: 'js/views/items/edit.html',
      controller: 'ItemsEditCtrl as itemsEdit'
    });

  $urlRouterProvider.otherwise('/');

}
