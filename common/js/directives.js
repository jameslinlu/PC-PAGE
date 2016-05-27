angular.module("App")
    .directive('appLoading', ['Events', '$rootScope', '$timeout', function (Events, $rootScope, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'common/view/loading.html',
            link: function (scope, element, attrs) {

            }
        };
    }
    ]).directive('appToast', function () {
        return {
            restrict: 'E',
            templateUrl: 'common/view/toast.html'
        };
    })
    .directive('appDialog', ['Events', '$rootScope', '$timeout', function (Events, $rootScope, $timeout){
        return {
            restrict: 'E',
            templateUrl: 'common/view/dialog.html'
        };
    }])
    .directive('timeEnd', ['$interval', '$rootScope', function ($interval, $rootScope) {    
        var checkTime = function (i) {
            var prefix = (i < 10) ? '0' : '';
                return prefix + i;
        };
        var cancle=function(set){
            $interval.cancel(set);
        }
        return {
            restrict: 'E',
            templateUrl: 'common/view/countDown.html',
            replace: 'true',
            scope: {
                timeShow1: "=time",
                timeCheck: '@'
            },
            link: function (scope, elem, attrs) {
                if (angular.isNumber(scope.timeShow1)) {
                    var time = scope.timeShow1;
                    scope.timeCheck = true;
                    scope.timeShow='';
                    var timeCheck = $interval(function () {
                        var ts = time - (new Date().getTime());//计算剩余的毫秒数
                        var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
                        var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
                        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
                        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
                        dd = checkTime(dd);
                        hh = checkTime(hh);
                        mm = checkTime(mm);
                        ss = checkTime(ss);
                        if (dd == '00') {
                            scope.timeShow = hh + "时" + mm + "分" + ss + "秒";
                        } else {
                            scope.timeShow = dd + "天" + hh + "时" + mm + "分" + ss + "秒";
                        }
                        if (ss == '00'&& mm == '00'&& hh == '00'&& dd == '00' ) {
                            scope.timeCheck = false;
                            cancle(timeCheck);
                        }

                    }, 1*1000);
                } else {
                    scope.timeCheck = false;
                }


            }
        }}])
    .directive('ipShow', function (){
        return {
            restrict: 'E',
            templateUrl: 'common/view/ip.html',
            replace: 'true',
            scope: {
                ip: "=",
                ipDialogShow:"&"
            },
            link: function (scope, elem, attrs) {
                var arr=[];
                console.log(scope.ip)
                if(scope.ip.indexOf(",")!=-1){
                    arr=scope.ip.split(',');
                    $.each(arr, function(i, item){
                        var ipPos=item.indexOf("/");
                        if(ipPos == -1){
                            arr[i]+= '/32';
                        }
                    });
                }else{
                   arr[0]=scope.ip;
                }
                scope.items=arr;
            }
        };
    })

