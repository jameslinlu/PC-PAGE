angular.module("App").service('ServerService',['$rootScope', 'HttpService', 'Events', function ($rootScope, HttpService, Events) {
    //首次进入页面获取列表数据
    this.instanceList=function(pageNum){
       HttpService.get("api/instance/list", {status: 2,page:pageNum}).then(function (response){
           $rootScope.$broadcast(Events.getSuccess, response);
        }, function (response){
           $rootScope.$broadcast(Events.getFailed, response);
       })
    }
    //特定id客户的列表信息
    this.instanceIdList=function(id){
        HttpService.get("api/instance/list", {instanceId:id}).then(function (response){
            $rootScope.$broadcast(Events.getIdSuccess, response);
        }, function (response){
            $rootScope.$broadcast(Events.getIdFailed, response);
        })
    }
    //特定id客户的停止服务
    this.instanceStop=function(id){
        HttpService.post("api/instance/stop", {instanceId:id}).then(function (response){
            $rootScope.$broadcast(Events.postSuccess, id);
        }, function (response){
            $rootScope.$broadcast(Events.postFailed, response);
        })
    }
}]).service('AnimationShow',['$rootScope',function($rootScope){
    this.setValue=function(attr,val){
        $rootScope.attr = val;
    }
}])