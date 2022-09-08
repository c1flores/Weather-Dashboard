//function to take user-input (city name), capitalize, and append capitalized city name to search list
function createCityList(cityList) {
  $("city-list").empty();

  //Grab local storage value of user-input city and append bootstrap list-item for animated interactivity on hover
  var cityName = Object.keys(cityList);
  for (var i = 0; i < cityName.length; i++) {
    var cityListEntry = $("<button>");
    cityListEntry.addClass("list-group-item list-group-item-action");

  //Capitalize first letter of each city name word and replace list text
    var splitStr = cityName[i].toLowerCase.split(" ");
    for (var j = 0; j < splitStr.length; j++) {
      splitStr[j] =
        splitStr[j].charAt(0).toUpperCase + splitStr[j].substring(1);
    }

    var capitalizedCity = splitStr.join(" ");
    cityListEntry.text(capitalizedCity);

    $("city-list").append(cityListEntry);
  }
}



