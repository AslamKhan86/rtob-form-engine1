'use strict';

function RefData($http, $q) {
    var lov_header = {
        "SC-CLIENT-CONTEXT": "{\"reqId\":\"8c5792e4-c489-467a-a2b1-3151fe84f039\",\"Channel\":\"Mobile\",\"Country\":\"IN\",\"Language\":\"EN\",\"AppName\":\"RCWB\",\"ClientId\":\"MOBILE\",\"InstanceCode\":\"CB_IN\",\"RumDevice\":\"devicebrowserversion\"}"
    };

    RefData.getRefDataResults = function(refDataParam){
        var deferred = $q.defer();
        var param = refDataParam;
        $http({
            method: 'GET',
            headers:  lov_header,
            url: 'http://10.20.235.67:82/origination/api/v2/refdata/' + param
            //url: 'http://10.20.235.75:18094/origination/api/v2/refdata/' + param,//For local
            // url: 'common/mock/getme404.json',
            // url: 'common/mock/bank.json',
        }).then(function(success) {
            deferred.resolve(success.data);
        }, function(error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    };
    return RefData;
};
