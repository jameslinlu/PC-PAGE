angular.module("App").controller('DetailsCtrl', [ '$scope', '$rootScope','$filter',
    function ( $scope, $rootScope, $filter) {
    	var $body = $('body');
        document.title = "联系我们"
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body);
}]);
