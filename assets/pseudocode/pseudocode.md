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

#### Create populateCityWeather function to retrieve data from Open Weather Map and display current weather as well as 5-day forecast. 

#### Make first API request and use Moment.js library to populate dashboard with date and weather data for current weather. 

#### Make second API request to display UV Index for current weather. 

#### Make third API request to populate weather data for 5-day forecast.

#### Save user entries to local storage for future retrieval.

#### Create button event handlers for program functionality.

