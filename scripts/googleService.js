/**
 * The Google Maps API Service
 * @author Joel Oliveira
 * @since 02/04/2016
 **/

 var GoogleService = function() {

  this.getLocation = function(zipCode) {

    var deferred = $.Deferred();
    getDataLocation({ 'address': zipCode }).then(dCoordsSuccess, dError);

    function dCoordsSuccess(result){
      var coods = getCoods(result);
      if(coods.lat != undefined){
        var latlng = new google.maps.LatLng(coods.lat(), coods.lng());
        getDataLocation({ 'location': latlng }).then(dAddressSuccess, dError);
      }else{
        dError("Coods not found!");
      }
    }

    function dAddressSuccess(result){
      deferred.resolve(result);
    }

    function dError(error){
      deferred.reject(error);
    }

    return deferred.promise();
  };

  function getDataLocation(params){
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(params, function(results, status){
      if (status == google.maps.GeocoderStatus.OK){
        deferred.resolve(results);
      }else{
        deferred.reject(status);
      }
    });
    return deferred.promise();
  }

  function getCoods(results){
    var coods = {};
    if (results.length >= 1) {
      if(results[0].geometry.location != undefined)
        return results[0].geometry.location;
    }
    return coods;
  }

};