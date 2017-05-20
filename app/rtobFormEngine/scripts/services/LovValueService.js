function LovValue($http) {
    var urlBase = 'common/mock/';

    var LovValue = {};

    LovValue.getLovValue = function() {
        return $http.get(urlBase + 'lov.json');
    };

    LovValue.getLovHomeBranch = function() {
        return $http.get('http://192.168.1.110:8080/lov.json');
    };
    LovValue.getLovBank = function() {
        return $http.get('http://192.168.1.110:8080/lovBank.json');
    };
    return LovValue;
}



'use strict';

function LovValue($http, BASE_URL, $q, _) {

    function LovValue(lovData) {
        if (lovData) {
            this.setData(lovData);
        }
    };


    LovValue.prototype = {

        setData: function(lovData) {
            angular.extend(this, lovData);
        },
        load: function(id) {
            var scope = this;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'common/mock/lov.json'
            }).then(function(success) {
                deferred.resolve(success);
                scope.setData(success.data);
            }, function(error) {
                //Error Message
            });
            return deferred.promise;
        }
    };
    return LovValue;
};
