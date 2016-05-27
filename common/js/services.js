/**
 * 全局service和provide定义
 */
angular.module("App").service('HttpService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
    console.log('HttpService onLoad');
    var request = function (url, method, params) {
        var deferred = $q.defer();
        //params:{ post时会按键值对发送 get时会拼接url}, data:{作为整体发送}
        $http({method: method, url: url, params: params, dataType: 'json'})
            .success(function (response) {
                if (response.code == '000000') {
                    deferred.resolve(response);
                } else {
                    deferred.reject(response);
                }
            })
            .error(function (response, code) {
                console.log('error', arguments);
                if (code == 404) {
                    deferred.reject({code: code, message: '服务器失联'});
                }
                else if (code == 500) {
                    deferred.reject({code: code, message: '服务器内部错误'});
                }
                else {
                    deferred.reject({code: code, message: '服务器短路'});
                }
            });
        return deferred.promise;
    };
    this.post = function (url, param) {
        return request(url, 'POST', param);
    };
    this.get = function (url, param) {
        return request(url, 'GET', param);
    }
}]);