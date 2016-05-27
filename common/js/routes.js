/* 全局页面路由 */
angular.module("App").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/server");
    $stateProvider

    // server列表页面
        .state('server', {
            url: "/server",
            templateUrl: "module/ServerList/view/server.html" ,
            data: {},
            controller: "ServerListCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        files: [
                            'module/ServerList/js/ServerController.js' ,
                            'module/ServerList/js/ServerFilter.js' ,
                            'module/ServerList/js/ServerService.js' ,
                            'module/ServerList/less/server.css'
                        ]
                    });
                }]
            }
        })
        // start页面
        .state('start', {
            url: "/start",
            templateUrl: "module/StartServer/view/start.html" ,
            data: {},
            controller: "StartServerCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        files: [
                            'module/StartServer/js/StartServerController.js' ,
                            'module/StartServer/js/StartServerFilter.js' ,
                            'module/StartServer/js/StartServerService.js' ,
                            'module/StartServer/less/StartServer.css'
                        ]
                    });
                }]
            }
        })
        // start页面
        .state('log', {
            url: "/log",
            templateUrl: "module/ServerLog/view/log.html" ,
            data: {},
            controller: "ServerLogCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        files: [
                            'module/ServerLog/js/ServerLogController.js' ,
                            'module/ServerLog/js/ServerLogFilter.js' ,
                            'module/ServerLog/js/ServerLogService.js' ,
                            'module/ServerLog/less/ServerLog.css'
                        ]
                    });
                }]
            }
        })
        // customerNews页面
        .state('customerNews', {
            url: "/customerNews",
            templateUrl: "module/CustomerNews/view/customerNews.html" ,
            data: {},
            controller: "CustomerNewsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        files: [
                            'module/CustomerNews/js/CustomerNewsController.js' ,
                            'module/CustomerNews/js/CustomerNewsFilter.js' ,
                            'module/CustomerNews/js/CustomerNewsService.js' ,
                            'module/CustomerNews/less/CustomerNews.css'
                        ]
                    });
                }]
            }
        })
        // customerNews页面
        .state('details', {
            url: "/details",
            templateUrl: "module/Details/view/details.html" ,
            data: {},
            controller: "DetailsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'App',
                        files: [
                            'module/Details/js/DetailsController.js' ,
                            'module/Details/less/details.css'
                        ]
                    });
                }]
            }
        })




}
]);