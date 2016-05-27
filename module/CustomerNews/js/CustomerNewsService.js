angular.module("App").service('CustomerNewsService',['$rootScope', 'HttpService', function ($rootScope, HttpService) {
    //首次进入页面获取列表数据
    this.GetCustomerNews=function(){
        HttpService.get("api/customer/bundles",'').then(function (response){
            $rootScope.$broadcast('GetCustomerNewsSuccess', response);
        }, function (response){
            $rootScope.$broadcast('GetCustomerNewsFailed', response);
        })
    };
}]).service('AnimationShow',['$rootScope',function($rootScope){
    this.setValue=function(attr,val){
        $rootScope.attr = val;
    }
}])