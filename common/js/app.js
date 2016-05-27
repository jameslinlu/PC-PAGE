/*
 * Mobile App
 * 负责加载config 和 触发run
 * */
var App = angular.module("App", [
    "ui.router",
    "oc.lazyLoad",
    'ngAnimate',
    'ngSanitize'
]);
/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
App.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        cssFilesInsertBefore: 'ng_load_plugins_before'
    });
}]);
//AngularJS v1.3.x workaround for old style controller declarition in HTML
App.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // support global function controller
    $controllerProvider.allowGlobals();
}]);
/* Init global settings and run the app */
App.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$state = $state;
    console.log('Application Runing Success', arguments);
}]);
