function GeoLocationModel(object){

	var street = object.street;
	var number = object.number;
	var city = object.city;
	var state = object.state;
	var country = object.country;

	this.getStreet = function(){
		return street;
	}

	this.getNumber = function(){
		return number;
	}	

	this.getCity = function(){
		return city;
	}

	this.getState = function(){
		return state;
	}

	this.getCountry = function(){
		return country;
	}

}