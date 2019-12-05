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
                    lat = response.coord.lat
                    long = response.coord.lon
                    responseVar = response;
                    console.log(responseVar)
                    buildPage(responseVar);
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
                    console.log(responseVar)
                    buildPage(responseVar);
                });
            }
            
            break;
        case "uv":
            console.log(lat);
            console.log(long);
            //lat = responseVar.coord.lat
            //lon = responseVar.coord.lon
            queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6bd5f328c4eb31862977239b636ff37a"
            +"&lat="+lat+"&lon="+long;
            //$.ajax({
            //    url: queryURL,
            //    method: "GET"
            //}).then(function(response){
            //    responseVar = response;
           //     console.log(responseVar)
            //    finishPage(responseVar);
            //});
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
    buildQuery("uv");

    
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
    //let weatherSymbol = weatherData.weather.children[0].icon;
    let temperature = "Temperature: " + weatherData.main.temp + " F";
    let humidity = "Humidity: " + weatherData.main.humidity + "%";
    let windSpeed = "Wind Speed: " + weatherData.wind.speed + " MPH";
    lat = weatherData.coord.lat;
    long = weatherData.coord.lon;

    let nameHTML = $("<h1></h1>").text(name);
    let temperatureHTML = $("<p></p>").text(temperature);
    let humidityHTML = $("<p></p>").text(humidity);
    let windSpeedHTML = $("<p></p>").text(windSpeed);
    $("#pageBlock").append(nameHTML);
    $("#pageBlock").append(temperatureHTML);
    $("#pageBlock").append(humidityHTML);
    $("#pageBlock").append(windSpeedHTML);
}

function finishPage(){
}

function fiveDayBuilder(){
    
}

