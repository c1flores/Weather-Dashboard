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

//main function to populate dashboard with city weather data for both current weather and 5-day forecast
function addCityWeather(city, cityList) {
  createCityList(cityList);

  //query for current weather
  var currentQuery = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=b2ec79033d3c438cc2e35b50d25dac5d&q=" + city;
  
  //query for 5-day forecast
  var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=b2ec79033d3c438cc2e35b50d25dac5d&q=" + city;

  //variable declaration for future use in API call
  var longitude;
  var latitude;

  $.ajax({
    url: currentQuery,
    method: "GET"
  })

  .then(function(weather) {

    console.log(currentQuery);

    console.log(weather);

    //variable initialization to display current day on current date section
    var currentDate = moment();

    //variable initialization for creating header element to eventually append current date using Moment.js
    var displayDate =  $("<h3>");

    $("#city-name").empty();
    $("#city-name").append(displayDate.text(" (" + currentDate.format("M/D/YYY")+ ")"));

    //variable initialization for showing city name on dashboard
    var city = $("<h3>").text(weather.name);
    $("#city-name").prepend(city);

    //variable initialization for showing respective weather icon on dashboard
    var weatherIcon = $("<img>");
    weatherIcon.attr("src", "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png" );

    $("#current-icon").empty();
    $("current-icon").append(weatherIcon);

    $("current-temp").text("Temperature: " + weather.main.temp + " F");
    $("current-humidity").text("Humidity: " + weather.main.humidity + " %");
    $("current-wind").text("Wind: " + weather.wind.speed + " MPH");

    //initialization for coordinate variables with city-specific values
    longitude = weather.coord.lat;
    latitude = weather.coord.lon;

    
    //query to be used for displaying UV index on dashboard
    var cityQuery = "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=b2ec79033d3c438cc2e35b50d25dac5d&q=" +
    "&lat=" +
    latitude +
    "&lon=" +
    longitude;

  })
}



