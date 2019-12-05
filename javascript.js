let queryURL;
let searchItem;
let responseVar;
let lat;
let long;

function buildQuery(caseVal){
    switch(caseVal){
        case "norm":
            if(searchItem !== undefined){
                queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
                +searchItem
                +"&APPID=6bd5f328c4eb31862977239b636ff37a";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    responseVar = response;
                    lat = responseVar.coord.lat
                    long = responseVar.coord.lon
                    console.log(responseVar)
                    buildPage(responseVar);
                    buildQuery("uv");
                    return lat,long;
                });
                
            }else{
                searchItem = $("#searchValue").val();
                buttonBuilder(searchItem);
                queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
                +searchItem
                +"&APPID=6bd5f328c4eb31862977239b636ff37a";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    responseVar = response;
                    lat = responseVar.coord.lat
                    long = responseVar.coord.lon
                    console.log(responseVar)
                    buildPage(responseVar);
                    buildQuery("uv");
                });
            }
            
            break;
        case "uv":
            console.log(lat);
            console.log(long);
            queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6bd5f328c4eb31862977239b636ff37a"
            +"&lat="+lat+"&lon="+long;
            $.ajax({
               url: queryURL,
            method: "GET"
            }).then(function(response){
                responseVar = response;
                console.log(responseVar)
                finishPage(responseVar);
            });
            break;
        case "fiveDay":
            queryURL ="http://api.openweathermap.org/data/2.5/forecast?q="
            +searchItem 
            +"&appid=6bd5f328c4eb31862977239b636ff37a";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                responseVar = response;
                console.log(responseVar)
                fiveDayBuilder(responseVar);
            });
            break;
        default:
            break;
    }
}

function startSearch(searchV){
    event.preventDefault();
    if(searchV !== undefined){
        searchItem = searchV.value;
    }else{
    }
    buildQuery("norm");
    buildQuery("fiveDay");
}

function buttonBuilder(buttonName){
    let builtButton = $("<button></button>").text(buttonName);
    builtButton.attr("class","cityButton");
    builtButton.attr("value", buttonName);
    builtButton.attr("onclick", "startSearch(this)");
    $("#buttonList").append(builtButton);
    $("#buttonList").append("<br>");
}

function buildPage(weatherData){
    let name = weatherData.name;
    let weatherSymbol = weatherData.weather['0'].icon;
    let temperature = weatherData.main.temp;
    temperature = ((temperature * (9/5)) - 459.67);
    temperature = temperature.toString();
    temperature = temperature.substring(0,5);
    temperature = "Temperature: " + temperature + " F";
    let humidity = "Humidity: " + weatherData.main.humidity + "%";
    let windSpeed = "Wind Speed: " + weatherData.wind.speed + " MPH";
    lat = weatherData.coord.lat;
    long = weatherData.coord.lon;

    let nameHTML = $("<h1></h1>").text(name);
    let weatherSymbolHTML = $("<img>").attr("src","http://openweathermap.org/img/w/" + weatherSymbol + ".png");
    let temperatureHTML = $("<p></p>").text(temperature);
    let humidityHTML = $("<p></p>").text(humidity);
    let windSpeedHTML = $("<p></p>").text(windSpeed);
    $("#pageBlock").append(nameHTML);
    $("#pageBlock").append(weatherSymbolHTML);
    $("#pageBlock").append(temperatureHTML);
    $("#pageBlock").append(humidityHTML);
    $("#pageBlock").append(windSpeedHTML);
}

function finishPage(uvData){
    let uvIndex = "UV Index: " + uvData.value;
    let uvHTML = $("<p></p>").text(uvIndex);
    $("#pageBlock").append(uvHTML);
}

function fiveDayBuilder(forecast){
    let days = [forecast.list['4'], 
                forecast.list['12'], 
                forecast.list['20'], 
                forecast.list['28'], 
                forecast.list['36']];
    let ticker = 0;
    days.forEach(function(buildVar){
        ticker++;
        console.log(buildVar);
        let dateHolder = buildVar.dt_txt;
        console.log(dateHolder);
        dateHolder = dateHolder.slice(0,10);
        let forecastTemp = buildVar.main.temp;
        forecastTemp = ((forecastTemp * (9/5)) - 459.67);
        forecastTemp = forecastTemp.toString();
        forecastTemp = forecastTemp.substring(0,5);
        let forecastHumidity = buildVar.main.humidity
        let forecastSymbol = buildVar.weather['0'].icon;
        let idGetter = "#forecastCard" + ticker;

        let dateHTML = $("<h3></h3>").text(dateHolder);
        let forecastSymbolHTML = $("<img>").attr("src","http://openweathermap.org/img/w/" + forecastSymbol + ".png");
        let forecastTempHTML = $("<p></p>").text(forecastTemp);
        let forecastHumidityHTML = $("<p></p>").text(forecastHumidity);
        $(idGetter).append(dateHTML);
        $(idGetter).append(forecastSymbolHTML);
        $(idGetter).append(forecastTempHTML);
        $(idGetter).append(forecastHumidityHTML);
    });
}
