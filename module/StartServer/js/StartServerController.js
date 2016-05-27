angular.module("App").controller('StartServerCtrl', ['StartServerService', '$scope', '$rootScope', '$interval', '$filter','$state','$location','$timeout',
    function (StartServerService, $scope, $rootScope, $interval, $filter,$state,$location,$timeout) {
        //进入页面根据url值不同调整页面
        var urlObject=StartServerService.parseQueryString($location.absUrl());
            if (urlObject.serviceId !== undefined) {
                $scope.ServiceStatus=true;
                if(urlObject.serviceId  == 1){
                    $scope.ServiceStatus=true;
                    $scope.ServiceDirection=false;
                        var $body = $('body');
                        document.title = "新建流量压制任务"
                        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
                        setTimeout(function() {
                                $iframe.off('load').remove()
                            }, 0)
                        }).appendTo($body);
                } else if(urlObject.serviceId  == 2){
                    $scope.ServiceStatus=true;
                    $scope.ServiceDirection=true;
                    $scope.selectedValue=2;
                    var $body = $('body');
                    document.title = "新建流量清洗任务"
                    var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
                        setTimeout(function() {
                            $iframe.off('load').remove()
                        }, 0)
                    }).appendTo($body);
                }
            }
            //页面url中有customerID信息
            if(urlObject.customerID !== undefined){
                $scope.customerID=urlObject.customerID;
            }
            //页面url中有customerID对应的ip信息
            if(urlObject.dstIP !== undefined){
                $scope.IpListShow=true;
                $scope.ipField=urlObject.dstIP;
            }
        //监听---获取客户列表
        $scope.$on('GetCustomerListSuccess', function (event, response) {
            //跳转页面
            if(response.code=="100001"){
               $state.go("/api/wx/authorize?callback="+$location.absUrl());
            }
            $scope.customers=response.body;
            //填充顾客选项下拉框内容,如果customerName存在或者只有一个customer选中
            $.each(response.body, function (i, n) {
                if($scope.customerID!==undefined && n.customerId == $scope.customerID){
                    //页面选中选择客户的id
                    $scope.CustomerSelect=n;
                }
            });
            if(response.body.length==1){
                $scope.CustomerSelect=response.body[0];
            }
        });
        //设置json对象压制方向选择--防护时长的默认值--初始化$scope.ipField值
        $scope.selectValue = [{value: 1, label: '全国'}, {value: 2, label: '国内其他运营商'},{value: 3, label: '国外运营商'}, {value: 4, label: '仅电信网内可访问'}];
        $scope.day=0;$scope.hour=2;$scope.minute=0;
        $scope.ipField='';
        //填充下拉搜索框li值
        // $scope.getCustomer=function(){
        //     if($scope.CustomerSelect!== undefined)
        //     {
        //         array=$scope.CustomerSelect.ipField.split(",");
        //         $scope.ipAll=$scope.CustomerSelect.ipField.split(",");
        //     }
        // };
           //监控用户下拉框
        $scope.$watch('CustomerSelect',function(newValue,oldValue, scope){
            if( $scope.CustomerSelect!== undefined){
                array=$scope.CustomerSelect.ipField.split(",");
                $scope.ipAll=$scope.CustomerSelect.ipField.split(",");
            }
        });
        //显示下拉选框内容
        $scope.IpShow=function(){
            $scope.IpListShow=true;
        }
        //点击选中ip显示框所选ip值
        $scope.ipSelect=function(event){
            $scope.ipField=event.target.innerHTML;
            $scope.IpListShow=false;
        }
        //模拟百度搜索
        var array=[];
        $scope.$watch('ipField',function(newValue,oldValue, scope){
            if( $scope.ipAll!==undefined){
                var settle=[];
                $.each(array, function(i, n){
                    if(n.match($scope.ipField)!=null && n.indexOf($scope.ipField)==0){
                        settle.push(n);
                    }
                });
                $scope.ipAll=settle;
            }
        });
        $scope.StartServer=function(){
            var param={};
            param.serviceId=urlObject.serviceId;
            param.customerId = $scope.CustomerSelect.customerId; //用户编号
            param.dutyDuration = ($scope.day)*24*60+($scope.hour)*60+($scope.minute)*1; //编号
            param.suppressDirection = $scope.selectedValue;//操作区域编号
            param.ipField = $scope.ipField; //编号
            console.log(param)
            //loading动画--按钮不可点
            $scope.ButtonStat=true;
            $rootScope.loading = true;
            $rootScope.LoadingContent = "防护启动中";
            StartServerService.apiStartServerLocal(param);
        };
        var timer;
        var time=0;
        //监听---本地开启服务
        $scope.$on('StartServerSuccess', function (event, response) {
            timer = $interval(function () {
                //获取特定id客户的信息
                StartServerService.apiStartServeRemote(response);
            }, 3000);
        });
        $scope.$on('StartServerFailed', function (event, response) {
            $rootScope.loading = false;
            $rootScope.dialog = true;
            $rootScope.title = "提示";
            $rootScope.content = response.message;
        });
        $rootScope.DialogHide= function (){
            $rootScope.dialog = false;
            $scope.ButtonStat=false;
        }
        //监听---远程开启服务
        $scope.$on('StartServerRemoteSuccess', function (event, response) {
            if( response.body.results[0].status == 1) {
                if (time > 7) {
                    time=0;
                    $scope.ButtonStat=false;
                    $rootScope.loading = false;
                    $rootScope.dialog = true;
                    $rootScope.title = "提示";
                    $rootScope.content = '防护任务启动中，请稍后查看。';
                }
            }
            else if(response.body.results[0].status == 2){
                $interval.cancel(timer);
                $rootScope.loading = false;
                $rootScope.toast = true;
                $rootScope.ToastContent = '防护已开启成功,2秒后将跳转到防护日志页面。';
                $timeout(function () {
                    $rootScope.toast = false;
                    $state.go('server');
                }, 2000);
            } else if(response.body.results[0].status == 3){
                $scope.ButtonStat=false;
                $interval.cancel(timer);
                $rootScope.loading = false;
                $rootScope.dialog = true;
                $rootScope.title = "提示";
                $rootScope.content = '启动失败，请重新启动。';
            }
        });
        //首次进入页面获取列表数据
        StartServerService.customerList();
}]);
