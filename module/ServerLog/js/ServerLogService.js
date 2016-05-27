angular.module("App").service('LogService',['$rootScope', 'HttpService', 'Events', function ($rootScope, HttpService, Events) {
    //首次进入页面获取列表数据
    this.GetStopList=function(pageNum){
        HttpService.get("api/instance/list", {status: 11,page:pageNum}).then(function (response){
            $rootScope.$broadcast('GetStopListSuccess', response);
        }, function (response){
            $rootScope.$broadcast('GetStopListFailed', response);
        })
    };
    //获取customer列表
    this.CustomerList=function(){
        HttpService.get("api/customer/list", {}).then(function (response){
            $rootScope.$broadcast('GetCusListSuccess', response);
        }, function (response){
            $rootScope.$broadcast('GetCusFailed', response);
        })
    };
    //获取特定列表数据
    this.GetSpecialStopList=function(param){
        HttpService.get("api/instance/list", param).then(function (response){
            $rootScope.$broadcast('GetStopListSuccess', response);
        }, function (response){
            $rootScope.$broadcast('GetStopListSuccess', response);
        })
    };
}]).service('AnimationShow',['$rootScope',function($rootScope){
    this.setValue=function(attr,val){
        $rootScope.attr = val;
    }
}])