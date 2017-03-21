function LovValue($http){
  var urlBase = 'common/mock/';

  var LovValue = {};

  LovValue.getLovValue = function () {
      return $http.get(urlBase+'lov.json');
  };
  return LovValue;
}
