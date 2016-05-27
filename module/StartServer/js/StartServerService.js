angular.module("App").service('StartServerService',['$rootScope', 'HttpService', function ($rootScope, HttpService) {
    //首次进入页面获取列表数据
    this.customerList=function(){
       HttpService.get("api/customer/list", {}).then(function (response){
           $rootScope.$broadcast('GetCustomerListSuccess', response);
        }, function (response){
           $rootScope.$broadcast('GetCustomerListFailed', response);
       })
    };
    //本地启动服务
    this.apiStartServerLocal=function(param){
        HttpService.post("api/instance/start",param).then(function (response){
            $rootScope.$broadcast('StartServerSuccess', param);
        }, function (response){
            $rootScope.$broadcast('StartServerFailed', response);
        })
    };
    //远程启动服务
    this.apiStartServeRemote=function(param){
        HttpService.get("api/instance/list", {customerId:param.customerId}).then(function (response){
            $rootScope.$broadcast('StartServerRemoteSuccess', response);
        }, function (response){
            $rootScope.$broadcast('StartServerRemoteFailed', response);
        })
    };
    this.parseQueryString=function(url){
        var obj={};
        var keyvalue=[];
        var key="",value="";
        var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
        for(var i in paraString)
        {
            keyvalue=paraString[i].split("=");
            key=keyvalue[0];
            value=keyvalue[1];
            obj[key]=value;
        }
        return obj;
    };
}]);
