# Pseudocode

## Objectives

- Layout the HTML Skeleton using Bootstrap
- Layout the foundation of logic to be used to read user-input and display appropriate weather data
- Optimize control flow of program

## Meta-Analysis of Approach

### Big Picture: Create a visual tool for tracking weather in specific locations. 

#### Use Bootstrap to create search container element along with empty city-list class to populate with future user entries.
```
START

   <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 pl-2">
                 <div class="card" style="width: 22rem">
                      <div class="card-body">
                          <h6>Search for a City:</h6>
                          <form class="form-inline">
                                <div class="form-group">
                                  <input type="text" class="form-control" id="city-input" />
                                </div>
                                <button id="search-button" type="submit" class="btn btn-primary">
                                <i class="fas fa-search"></i></button>
                            </form>
                       </div>
                  </div>

                    <div>
                        <ul id="city-list" class="list-group"></ul>
                    </div>
            </div>
```

#### Use Bootstrap to create current weather container element. 
```
  <div class="col-md-9">
      <div id="current-weather" class='card'>
           <div class="card-body">
            <div id="city-date-icon">
                  <span id='city-name'>
                  </span>
                  <span id='current-icon'></span>
            /div>
            <p class="card-text" id="current-temp"></p>
            <p class="card-text" id="current-humidity"></p>
            <p class="card-text" id="current-wind"></p>
            <p class="card-text" id="current-uv"></p>          
       </div>
    </div>
```

#### Use Bootstrap to create 5-day forecast card elements. Repeat code after "5-day Forecast" heading tag to span number of days to forecast. 
```
  <div class="row">
      <div id="forecast-weather" class="col-md-9">
                <h4>5-day Forecast</h4>
            <div id="forecast-cards">
                  <div class="card forecast">
                           <div id="forecast1" class="card-body">
                                <span class="card-title" id="forecast-date1"> </span>
                                <span id="forecast-icon1"></span>
                                <p class="card-text" id="forecast-temp1"></p>
                                <p class="card-text" id="forecast-humidity1"></p>
                           </div>
                   </div>
```

#### Make createCityList function to use for recording user search history on dashboard.
```
function createCityList(cityList)

Use .empty() method to avoid duplicate city name storage 

Store user-input object in variable cityName

For each city entry, add bootstrap class to properly display entry below search bar

Use .split() method to take city name and split into separate words

For each word in city name, index in first letter and capitalize. 

Put back split array entries to display full, continuous city name by using .join() method

Append child element of capitalized city name to parent element
``` 

#### Create addCityWeather function to retrieve data from Open Weather Map and display current weather as well as 5-day forecast. Function will continue until last step 
```
Run createCityList function

Initialize query variables with URL parameters required for current weather and 5-day forecast

Declare longitude and latitude variables for future iteration
``` 

#### Make first API request and use Moment.js library to populate dashboard with date and weather data for current weather. 
```
Make first api request using current weather URL parameter

Use Moment.js library to populate current weather section of dashboard with current date

Create weather icon to display next to current weather section of dashboard

Make .empty() function call to dynamically update icon 

Display current date's weather information (temperature, humidity, wind)
```
#### Set values for longitude and latitude variables with appropriate values & create another URL parameter to display UV Index data. 
```
Initialize longitude and latitude variables for proper functionality

Create URL parameter for UV index
```
#### Make second API request to display UV Index for current weather. 
```
Make second API request using uvQUERY parameter

Use jQuery to add button to indicate sun intensity 

Find and set specific UV index value
```

#### Make third API request to populate weather data for 5-day forecast.

#### Save user entries to local storage for future retrieval.

#### Create button event handlers for program functionality.

