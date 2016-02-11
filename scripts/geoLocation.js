 function getLocation(){    
  var zipCode = $("#zip").val();
  zipCode = zipCode.replace(/\s/g, '');
  
  $("#address").text();

  if(zipCode.length != 6){
    alert("Postal code could be wrong!");
  }  

  var geo = GeoLocationFactory();
  geo.getLocationByZipCode(zipCode).then(workResults, workError);

}

function workResults(result){
  var text = result.getStreet() + ", " 
  + result.getCity() + ", " + result.getState() + ", " + result.getCountry();

  $("#address").text(text);

}

function workError(error){
  $("#address").text(error);
}