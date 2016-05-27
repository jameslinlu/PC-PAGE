angular.module("App").controller('CustomerNewsCtrl', ['CustomerNewsService', '$scope', '$rootScope','$filter',
    function (CustomerNewsService, $scope, $rootScope, $filter) {
    	var $body = $('body');
        document.title = "客户信息"
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body);
        //首次进入页面,获取列表数据
         CustomerNewsService.GetCustomerNews();
        //response.body.results[i].status = $filter('ServerFilterStatus')(response.body.results[i].status);
        $scope.$on('GetCustomerNewsSuccess',function(event, response){
            response=$filter('CustomerNewsService')(response);
            $scope.results = response.body;
        })
}]);
