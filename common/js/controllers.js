/* Setup App Main Controller */
angular.module("App").controller('AppCtrl', ['$scope', '$rootScope', '$timeout', '$state', 'HttpService', function ($scope, $rootScope, $timeout, $state, HttpService) {
    //所有子Ctrl OnLoad事件 $scope.$on('$viewContentLoaded', function () {});
    //fire window onLoad
    //console.log('AppCtrl onLoad', arguments);
    //路由变更事件
    $rootScope.$on('$stateChangeStart', function (event, target) {
        console.log('stateChangeStart', arguments);
        //TODO 前端权限过滤
    });

    //$state.go('server');

}]);


