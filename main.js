
/* 1. Show the weather based on current location.
   2. Display a different icon depending on the weather.
   3. Push a button to toggle between Fahrenheit and Celsius. 
   4. Handle exceptions when user declines geolocation or geolocation is not enabled.
   5. Show default location.
   6. BONUS TODO: loader spinner! */

$(document).ready(function() {

    getLocation();

});

function getLocation() {
    var output = document.getElementById("output");

    if (navigator.geolocation) {
        output.innerHTML = "Please wait while the weather in your area loads."; // DO NOT change this message without changing error handling conditional in test()
        navigator.geolocation.getCurrentPosition(buildTag, showError);
    } else {
        output.innerHTML = "Geolocation is not supported by this browser.";
    };
};

function buildTag(position) {
    var tag, lat, lon;

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    tag = document.createElement("script");
    tag.src = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon + "&callback=test";

    document.getElementsByTagName("head")[0].appendChild(tag);
};


function showError(error) {
    var tag, output;

    output = document.getElementById("output");
    tag = document.createElement("script");
    tag.src = "https://fcc-weather-api.glitch.me/api/current?lat=38.889931&lon=-77.009003&callback=test";

    switch(error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "<p>Don't want to see the weather in your location?</p><p>Here it is in Washington DC instead!</p>";
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Sorry, your location information is unavailable.<br />Check out the weather in Washington DC instead!";
            break;
        case error.TIMEOUT:
            output.innerHTML = "Sorry, the request to get your location timed out.<br />Here's the weather in Washington DC!";
            break;
        case error.UNKNOWN_ERROR:
            output.innerHTML = "Sorry, an unknown error occurred.<br />You can still check the weather in Washington DC!";
            break;
    };

    document.getElementsByTagName("head")[0].appendChild(tag);
};

// Must exist in global scope
function test(response) {     // Response is object returned from the API request 

    var image, deg, fahrenheitTemp, celsiusTemp, name, country, mainWeather;

    name = response.name;
    country = response.sys.country;
    mainWeather = response.weather[0].main;
    celsiusTemp = Math.round(response.main.temp);
    deg = document.getElementById("deg");

    image = document.createElement("img");
    image.src = response.weather[0].icon;
    document.getElementById("weather").appendChild(image);

    // check if error handling updated message; if it didn't, replace loading message 
    if (document.getElementById("output").innerHTML.substr(0, 2) === "Pl"){
        document.getElementById("output").innerHTML = "Here's the weather in your area!";
    }

    document.getElementById("name").innerHTML = name + ", " + country;
    document.getElementById("temp").innerHTML = celsiusTemp + " &deg;";
    document.getElementById("deg").innerHTML = "C";
    document.getElementById("main-weather").innerHTML = mainWeather;

    document.getElementById("toggle").onclick = function(){
        if (deg.innerHTML === "C"){
            fahrenheitTemp = Math.round(celsiusTemp * 1.8 + 32);
            deg.innerHTML = "F";
            document.getElementById("temp").innerHTML = fahrenheitTemp + " &deg;";
        } else if (deg.innerHTML === "F"){
            deg.innerHTML = "C";
            document.getElementById("temp").innerHTML = celsiusTemp + " &deg;";
        };
    };
};


