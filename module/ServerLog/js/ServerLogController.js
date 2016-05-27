angular.module("App").controller('ServerLogCtrl', ['LogService',  '$scope', '$rootScope', '$interval', '$filter', '$timeout','$state',
    function (LogService, $scope, $rootScope, $interval, $filter, $timeout,$state) {
        var $body = $('body');
        document.title = "防护日志"
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body);
        //滑动到底部自动加载数据
        var pageNum=1;
        $(window).scroll(function(){
            var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
            if($(document).height() <= totalheight){
                pageNum++;
                LogService.GetStopList(pageNum);
            }
        });
        //首次进入页面获取列表数据,列表页面show,查询页面hide
        $scope.$on('GetStopListSuccess', function (event, response) {
            $scope.SelectPage=false;
            $scope.ListPage=true;
            //filter过滤数据
            for (i = 0; i < response.body.results.length; i++) {
                response.body.results[i].status = $filter('LogFilterStatus')(response.body.results[i].status);
                response.body.results[i].activateTime = $filter('date')(response.body.results[i].activateTime, 'yyyy-MM-dd HH:mm:ss');
                response.body.results[i].deadline = $filter('LogFilterTime')(response.body.results[i]);
                response.body.results[i].terminateTime = $filter('date')(response.body.results[i].deadline, 'yyyy-MM-dd HH:mm:ss');
                if(response.body.results[i].customerName.length>=13){
                response.body.results[i].customerName= response.body.results[i].customerName.substring(0,10)+"<br/>"+ response.body.results[i].customerName.substring(10)
            }
            }
            $scope.results = response.body.results;
        });
        LogService.GetStopList(pageNum);
        $scope.QueryList=function(){
            $scope.ListPage=false;
            $scope.SelectPage=true;
            //进入查询页面--获取列表数据
            $scope.$on('GetCusListSuccess', function (event, response) {
                //填充客户select
                $scope.customers=response.body;
                //填充服务select
                $scope.selectValue = [{value: 1, label: '压制'}, {value: 2, label: '清洗'}];
            });
            LogService.CustomerList();

        };
        $scope.ConfirmSelect=function(){
            var param={};
            param.serviceId =  $scope.selectedValue;
            param.customerId =  $scope.CustomerSelect;
            param.status = 11;
            param.activateTimeBegin= $filter('date')($scope.StartTime, 'yyyy-MM-dd');
            param.activateTimeEnd=$filter('date')($scope.StopTime, 'yyyy-MM-dd');
            console.log(param)
            LogService.GetSpecialStopList(param);
        };
}]);
