angular
  .module('borrowApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['User', '$rootScope', '$state', '$auth', '$scope'];
function MainCtrl(User, $rootScope, $state, $auth, $scope) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
    $scope.navIsOpen = false;
  });

  const protectedStates = ['itemsNew', 'itemsEdit'];

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
    }
    vm.pageName = toState.name;
  });

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;

}
