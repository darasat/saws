var myApp = angular.module('myApp',[]);

myApp.controller('dropdownCtrl', ['$scope','CustomerService', function($scope, CustomerService) {
  
  $scope.customer ={
    Name:'', 
    Country:'', 
    State: '', 
    City: ''
  };
  
  $scope.countries = CustomerService.getCountry();
    
  $scope.getCountryStates = function(){
    $scope.sates = CustomerService.getCountryState($scope.customer.Country);
    $scope.cities =[];
  }
  
  $scope.getStateCities = function(){
    debugger;
     $scope.cities = CustomerService.getStateCity($scope.customer.State);
  }

  $scope.getInstituciones = function () {
     debugger;
     $scope.instituciones = CustomerService.getInstitucion($scope.customer.Institucion);
  }
  
 
}]);

myApp.factory("CustomerService", ['$filter', function($filter){
 var service = {};
  
  
  var countrylist = [
            { "id": 1, "country": "Australia" },
            { "id": 2, "country": "Canada" },
            { "id": 3, "country": "Estados Unidos" },
            { "id": 4, "country": "Inglaterra" },
            { "id": 5, "country": "Sudafrica" },
            { "id": 6, "country": "Francia" },
            { "id": 7, "country": "Nueva Zelanda" },
            { "id": 8, "country": "Malta" }
    ];
  
  var citylist = [
    {"Id":1, "state":"Brisbane", "countryId": 1},
    {"Id":2, "state":"Sidney", "countryId": 1},
    {"Id":3, "state":"Melbourne", "countryId": 1},
    {"Id":4, "state":"Perth", "countryId": 1},
    {"Id":5, "state":"Darwin", "countryId": 1},
    {"Id":6, "state":"Toronto", "countryId": 2},
    {"Id":7, "state":"Vancouver", "countryId": 2},
    {"Id": 8, "state": "Montreal", "countryId": 2},
    {"Id": 9, "state": "Boston", "countryId": 3 },
    {"Id": 10, "state": "Fort lauderdale", "countryId": 3 },
    {"Id": 11, "state": "Los angeles", "countryId": 3},
    {"Id": 12, "state":"Nueva York", "countryId": 3},
    {"Id": 13, "state": "San Diego", "countryId": 3 },
    {"Id": 14, "state": "San Francisco", "countryId": 3 },
    {"Id": 15, "state": "Santa Barbara", "countryId": 3 },
    {"Id": 16, "state": "Brighton", "countryId": 4 },
    {"Id": 17, "state": "Cambridge", "countryId": 4},
    {"Id": 18, "state": "Eastbourne", "countryId": 4 },
    {"Id": 19, "state": "Londres", "countryId": 4 },
    {"Id": 20, "state": "Torbay", "countryId": 4 }
  ];
  
  var institucionlist = [
    {"Id":1, "city":"ILSC", "stateId": 1},
    {"Id":2, "city":"LSI", "stateId": 1},
    {"Id":3, "city":"Navitas English", "stateId": 1},
    {"Id":4, "city":"English Language Company", "stateId": 2},
    {"Id":5, "city":"ILSC", "stateId": 2},
    {"Id":6, "city":"Navitas English", "stateId": 2},
    {"Id":7, "city":"Discover English", "stateId": 3},
    {"Id":8, "city":"Hawthorn", "stateId": 3},
    {"Id":9, "city":"Bathurst", "stateId": 4},
    {"Id":10, "city":"Campbellton", "stateId": 4},
    {"Id":11, "city":"Dieppe", "stateId": 4},
    {"Id":12, "city":"Edmundston", "stateId": 4},
    {"Id":13, "city":"Fredericton", "stateId": 4},
    {"Id":14, "city":"Miramichi", "stateId": 4},
    {"Id":15, "city":"Moncton", "stateId": 4},
    {"Id":16, "city":"Brandon", "stateId": 5},
    {"Id":17, "city":"Dauphin", "stateId": 5},
    {"Id":18, "city":"Flin Flon", "stateId": 5},
    {"Id":19, "city":"Morden", "stateId": 5},
    {"Id":20, "city":"Portage la Prairie", "stateId": 5},
    {"Id":21, "city":"Selkirk", "stateId": 5},
    {"Id":22, "city":"Steinbach", "stateId": 5},
    {"Id":23, "city":"Thompson", "stateId": 5},
    {"Id":24, "city":"Winkler", "stateId": 5},
    {"Id":25, "city":"South Delhi", "stateId": 6},
    {"Id":26, "city":"North Delhi", "stateId": 6},
    {"Id":27, "city":"East Delhi", "stateId": 6},
    {"Id":28, "city":"West Delhi", "stateId": 6},
    {"Id":29, "city":"Old Delhi", "stateId": 6},
    {"Id":29, "city":"New Delhi", "stateId": 6},
    {"Id":34, "city":"Yamuna Paar", "stateId": 6},
    {"Id":35, "city":"Chembur", "stateId": 7},
    {"Id":36, "city":"Borivali West", "stateId": 7},
    {"Id":37, "city":"Ghatkopar West", "stateId": 7},
    {"Id":38, "city":"Juhu", "stateId": 7},
    {"Id":40, "city":"Mira Road", "stateId": 7},
    {"Id":41, "city":"Powai", "stateId": 7},
    {"Id":42, "city":"Virar West", "stateId": 7},
    {"Id":43, "city":"Rajarhat", "stateId": 8},
    {"Id":44, "city":"Park Street", "stateId": 8},
    {"Id":45, "city":"Golpark", "stateId": 8},
    {"Id":46, "city":"Chandan Nagar", "stateId": 8}
  ];

  var institucion = [
     { "Id": 1, "state": "Alaska", "countryId": 1 },
     { "Id": 2, "state": "California", "countryId": 1 },
     { "Id": 3, "state": "New York", "countryId": 1 },
     { "Id": 4, "state": "New Brunswick", "countryId": 2 },
     { "Id": 5, "state": "Manitoba", "countryId": 2 },
     { "Id": 6, "state": "Delhi", "countryId": 3 },
     { "Id": 7, "state": "Bombay", "countryId": 3 },
     { "Id": 8, "state": "Calcutta", "countryId": 3 }
  ];
  
  service.getCountry = function(){    
    return countrylist;
  };
  
  service.getCountryState = function(countryId){
    var states = ($filter('filter')(citylist, {countryId: countryId}));
    return states;
  };
  
  
  service.getStateCity = function(stateId){    
   
    var items = ($filter('filter')(institucionlist, {stateId: stateId}));      
    return items;
  };

  service.getInstitucion = function ()
  {
      var instituciones = ($filter('filter'));
      return instituciones;
  };

  service.getSede = function ()
  {
      var sedes = ($filter('filter'));
  };

  service.getCurso = function ()
  {

  };

  service.getDuracionCurso = function () {

  };

  service.getSeguro = function () {

  };

  service.getDuracionSeguro = function () {

  };

  service.getAlojamiento = function () {

  };
  
  service.getTipoAlojamiento = function () {

  };

  service.getDuracionAlojamiento = function () {

  };

  service.getTrasladoAeropuerto = function () {

  };

  service.getTiqueteAereo = function () {

  };



  return service;
  
  
}]);