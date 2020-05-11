$(document).ready(function () {
    $(".button").on("click", function () {
        const searchQuery = $(".search-form").val();
        $(".search-form").val("");

        console.log("Button works:)");
        console.log(searchQuery);
        findWeather(searchQuery);
    })

    $(".list-group-item-action").on("click", function () {
        findWeather($(this).text());
    })

});
const apiKey = "ff48a5f39420daf03bb09b9e21c6fe87";


function findForecast(city) {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey,
    }).then(function (response) {

        console.log(response);

        $(".forecast-row").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("12:00:00") != -1) {
                var col = $("<div>").addClass("col-2");
                var card = $("<div>").addClass("card bg");
                var body = $("<div>").addClass("card-body p-1");
                var title = $("<h>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                var p1 = $("<p>").addClass("card-text").html("<strong>Temperature: </strong>" + response.list[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").html("<strong>Humidity: </strong>" + response.list[i].main.humidity + "%");


                col.append(card.append(body.append(title, img, p1, p2)));
                $(".forecast-row .row").append(col);

            }
        }
    })
}

function findWeather(city) {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
    }).then(function (response) {
        console.log(response);
        console.log(userHistory);

        if (userHistory.indexOf(city) === -1) {
            var li = $("<li>").addClass("list-group-item list-group-item-action").text(city);
            $(".history-list").append(li);

            userHistory.push(city);
            window.localStorage.setItem("userHistory", JSON.stringify(userHistory));


        }

        $(".current-day").empty();

        let todayCard = $("<div>").addClass("card today").attr("style","float:center");
        let location = $("<h4>").addClass("card-header").text(response.name + " " + new Date().toLocaleDateString());
        let temperature = $("<p>").addClass("card-text").text("Temperature: " + Math.round((response.main.temp - 273.15) * (9 / 5) + 32) + " degrees Farenheit");
        let humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        let windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + Math.round(response.wind.speed * 2.237) + " MPH");
        let weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png").attr("style","height:250px");

        let iconCard = $("<div>").addClass("card").attr("style","float:right");
        
        iconCard.append(weatherImage);
        todayCard.append(location, temperature, humidity, windSpeed);
        $(".current-day").append(todayCard, iconCard);

        findForecast(city);
        findUVI(response.coord.lat, response.coord.lon);
    })
}

function findUVI(lat,long){
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat +"&lon=" + long,
    }).then(function (response){
        console.log("UVI", response);

        let uvi = $("<p>").addClass("card-text").text("UVI: ");
        let uviIndicator = $("<span>").addClass("btn").text(response.value);

        if(response.value < 3){
            uviIndicator.addClass("btn-success");
        }
        else if( response.value >= 3 && response.value < 7){
            uviIndicator.addClass("btn-warning");
        }
        else{
            uviIndicator.addClass("btn-danger");
        }

        uvi.append(uviIndicator);
        $(".current-day .today").append(uvi);

        
        

    })
}



var userHistory = JSON.parse(window.localStorage.getItem("userHistory")) || [];
console.log(userHistory)

if (userHistory.length > 0) {
    findWeather(userHistory[userHistory.length - 1]);
}

for (var i = 0; i < userHistory.length; i++) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(userHistory[i]);
    $(".history-list").append(li);
}

