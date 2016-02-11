/**
 * The Geo Location API Factory
 * @author Joel Oliveira
 * @since 02/04/2016
 **/

function GeoLocationFactory(){
	this.getLocationByZipCode = getLocationByZipCode;

	function getLocationByZipCode(zipCode){

		var deferred = new Defer();
		var google = new GoogleService();

		google.getLocation(zipCode).then(dSuccess, dError);

		function dSuccess(result){

			if(result[0].address_components != undefined && result[0].address_components.length > 0){

				var model = new GeoLocationModel(decodeData(result[0].address_components));
				deferred.resolve(model);
			}else{
				dError("Error on grab data!");
			}
		}

		function dError(error){
			deferred.reject(error);
		}

		function decodeData(data){
			var addr = {};

			for (var ii = 0; ii < data.length; ii++){
				var city = '';				
				var types = data[ii].types.join(",");
				
				if (types == "street_number"){
					addr.number = data[ii].long_name;
				}
				if (types == "route" || types == "point_of_interest,establishment"){
					addr.street = data[ii].long_name;
				}
				if (types == "sublocality,political" || types == "locality,political" || types == "neighborhood,political" || types == "administrative_area_level_3,political"){
					addr.city = (city == '' || types == "locality,political") ? data[ii].long_name : city;
				}
				if (types == "administrative_area_level_1,political"){
					addr.state = data[ii].short_name;
				}
				if (types == "country,political"){
					addr.country = data[ii].long_name;
				}
			}

			return addr;
		}

		return deferred.promise;
	}

	return this;
}