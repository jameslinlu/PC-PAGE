angular.module("App").controller('ServerListCtrl', ['ServerService', 'Events', '$scope', '$rootScope', '$interval', '$filter', '$timeout','$state',
    function (ServerService, Events, $scope, $rootScope, $interval, $filter, $timeout,$state) {
        var $body = $('body');
        document.title = "实时防护任务列表"
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
                ServerService.instanceList(pageNum);
            }
        });
    //首次进入页面获取列表数据
    $scope.$on(Events.getSuccess, function (event, response) {
        //filter过滤数据
        for (i = 0; i < response.body.results.length; i++) {
            response.body.results[i].status = $filter('ServerFilterStatus')(response.body.results[i].status);
            response.body.results[i].deadline = $filter('ServerFilterTime')(response.body.results[i]);
            response.body.results[i].terminateTime = $filter('date')(response.body.results[i].deadline, 'yyyy-MM-dd HH:mm:ss');
            response.body.results[i].activateTime = $filter('date')(response.body.results[i].activateTime, 'yyyy-MM-dd HH:mm:ss');
            if(response.body.results[i].customerName.length>=13){
                response.body.results[i].customerName= response.body.results[i].customerName.substring(0,10)+"<br/>"+ response.body.results[i].customerName.substring(10)
            }
        }
        $scope.results = response.body.results;
    });
    $rootScope.DialogHide= function (){
        $rootScope.dialog = false;
        $scope.ButtonStat=false;
    }
    $scope.stop = function (item) {
        //显示loading动画
        $scope.ButtonStop=true;
        $rootScope.loading = true;
        $rootScope.LoadingContent ='防护停止中';
        ServerService.instanceStop(item.instanceId);
    }
    //每个列表项内部点击
    var timer;
    $scope.$on(Events.postSuccess, function (event, response) {
        //每隔2秒向查询，该实例状态信息
        timer = $interval(function () {
            //获取特定id客户的信息
            ServerService.instanceIdList(response);
        }, 2000);
    });
    $scope.$on(Events.postFailed, function (event, response) {
        $rootScope.loading = false;
        $rootScope.dialog = true;
        $rootScope.title = "提示";
        $rootScope.content = response.message;
    });
    var time = 0;
    $scope.$on(Events.getIdSuccess, function (event, response) {
        time++;
        console.log(time)
        if (response.body.results[0].status == 11) {
            $interval.cancel(timer);
            $rootScope.loading = false;
            $rootScope.toast = true;
            $rootScope.ToastContent = '防护已停止成功,2秒后将跳转到防护日志页面。';
            $timeout(function () {
                $state.go('log');
                $rootScope.toast = false;
            }, 2000);
        } else if (response.body.results[0].status == 10) {
            if (time > 7) {
                time=0;
                $scope.ButtonStop=false;
                $rootScope.loading = false;
                $rootScope.dialog = true;
                $rootScope.title = "提示";
                $rootScope.content = '防护任务停止中，请稍后查看。';
            }
        } else if (response.body.results[0].status == 12) {
            time=0;
            $scope.ButtonStop=false;
            $rootScope.loading = false;
            $rootScope.dialog = true;
            $rootScope.title = "提示";
            $rootScope.content = '停止失败，2秒后会刷新页面，请重新停止该服务。';
        }
    });
    ServerService.instanceList(pageNum);
}]);
