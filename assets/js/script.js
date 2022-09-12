//function to take user-input (city name), capitalize, and append capitalized city name to search list
function createCityList(cityList) {
  $("#city-list").empty();

  //Grab local storage value of user-input city and append bootstrap list-item for animated interactivity on hover
  var cityName = Object.keys(cityList);
  for (var i = 0; i < cityName.length; i++) {
    var cityListEntry = $("<button>");
    cityListEntry.addClass("list-group-item list-group-item-action");

    //Capitalize first letter of each city name word and replace list text
    var splitStr = cityName[i].toLowerCase().split(" ");
    for (var j = 0; j < splitStr.length; j++) {
      splitStr[j] =
        splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
    }

    var capitalizedCity = splitStr.join(" ");
    cityListEntry.text(capitalizedCity);

    $("#city-list").append(cityListEntry);
  }
}

//main function to populate dashboard with city weather data for both current weather and 5-day forecast
function addCityWeather(city, cityList) {
  createCityList(cityList);

  //query for current weather
  var currentQuery =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=b2ec79033d3c438cc2e35b50d25dac5d&q=" +
    city;

  //query for 5-day forecast
  var forecastQuery =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=b2ec79033d3c438cc2e35b50d25dac5d&q=" +
    city;

  //variable declaration for future use in API call
  var latitude;
  var longitude;

  //first API request to modify data so that current weather is shown on dashboard
  $.ajax({
    url: currentQuery,
    method: "GET",
  }).then(function (weather) {
    console.log(currentQuery);

    console.log(weather);

    //variable initialization to display current day on current date section
    var currentDate = moment();

    //variable initialization for creating header element to eventually append current date using Moment.js
    var displayDate = $("<h3>");

    $("#city-name").empty();
    $("#city-name").append(
      displayDate.text("(" + currentDate.format("M/D/YYYY") + ")")
    );

    //variable initialization for showing city name on dashboard
    var city = $("<h3>").text(weather.name);
    $("#city-name").prepend(city);

    //variable initialization for showing respective weather icon on dashboard
    var weatherIcon = $("<img>");
    weatherIcon.attr(
      "src",
      "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
    );

    $("#current-icon").empty();
    $("#current-icon").append(weatherIcon);

    $("#current-temp").text("Temperature: " + weather.main.temp + " F");
    $("#current-humidity").text("Humidity: " + weather.main.humidity + " %");
    $("#current-wind").text("Wind: " + weather.wind.speed + " MPH");

    //initialization for coordinate variables with city-specific values
    latitude = weather.coord.lat;
    longitude = weather.coord.lon;

    //query to be used for displaying UV index on dashboard
    var uvQuery =
      "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=b2ec79033d3c438cc2e35b50d25dac5d&q=" +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;

    //second API request to modify data so that uv index is displayed for current weather on dashboard
    $.ajax({
      url: uvQuery,
      method: "GET",
    }).then(function (uvIndex) {
      console.log(uvIndex);

      //create button to display uv index severity. Setting as "red" by default since summer time typically trends with a high sun intensity.
      var uvIndexDisplay = $("<button>");
      uvIndexDisplay.addClass("btn btn-danger");

      //find specific uv index value
      $("#current-uv").text("UV Index: ");
      $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
      console.log(uvIndex[0].value);

      //third API request to modify data so that forecast is displayed for five consecutive days
      $.ajax({
        url: forecastQuery,
        method: "GET",
      }).then(function (forecast) {
        console.log(forecastQuery);

        console.log(forecast);

        //loop through the forecast list array to show a single forecast entry & time. The API used in this query provides weather data at 3-hour increments.
        for (var i = 6; i < forecast.list.length; i += 8) {
          //create element to display date
          var forecastDate = $("<h5>");

          //use loop interval to provide an index so that days are placed in correct order
          var forecastPlacement = (i + 2) / 8;

          console.log("#forecast-date" + forecastPlacement);

          //add date to forecast cards
          $("#forecast-date" + forecastPlacement).empty();
          $("#forecast-date" + forecastPlacement).append(
            forecastDate.text(currentDate.add(1, "days").format("M/D/YYYY"))
          );

          //create element to populate with appropriate weather icon
          var forecastSymbol = $("<img>");

          forecastSymbol.attr(
            "src",
            "https://openweathermap.org/img/w/" +
              forecast.list[i].weather[0].icon +
              ".png"
          );

          //add appropriate weather icon
          $("#forecast-icon" + forecastPlacement).empty();
          $("#forecast-icon" + forecastPlacement).append(forecastSymbol);

          console.log(forecast.list[i].weather[0].icon);

          //add relevant data to each forecast card
          $("#forecast-temp" + forecastPlacement).text(
            "Temp: " + forecast.list[i].main.temp + " °F"
          );
          $("#forecast-wind" + forecastPlacement).text(
            "Wind Speed: " + (forecast.list[i].wind.speed).toFixed(2) + " MPH"
          );
          $("#forecast-humidity" + forecastPlacement).text(
            "Humidity: " + forecast.list[i].main.humidity + " %"
          );

          $(".forecast").attr(
            "style",
            "background-color: #0047AB; color:white"
          );
        }
      });
    });
  });
}

//ready event after DOM has been loaded
$(document).ready(function () {
  var cityListString = localStorage.getItem("cityList");

  var cityList = JSON.parse(cityListString);

  if (cityList == null) {
    cityList = {};
  }

  createCityList(cityList);

  $("#current-weather").hide();
  $("#forecast-weather").hide();

  //event handler for search results to prompt program functionality
  $("#search-button").on("click", function (event) {
    event.preventDefault();

    var city = $("#city-input").val().trim().toLowerCase();

    if (city != "") {
      cityList[city] = true;

      localStorage.setItem("cityList", JSON.stringify(cityList));

      addCityWeather(city, cityList);

      $("#current-weather").show();
      $("#forecast-weather").show();
    }
  });

  //event handler for choosing previously searched city and populating with respective weather data
  $("#city-list").on("click", "button", function (event) {
    event.preventDefault();

    var city = $(this).text();

    addCityWeather(city, cityList);

    $("#current-weather").show();
    $("#forecast-weather").show();
  });
});
