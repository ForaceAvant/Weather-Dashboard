$(document).ready(function(){
    $(".button").on("click", function(){
        const searchQuery = $(".search-form").val();
        $(".search-form").val("");

        var li = $("<li>").addClass("list-group-item list-group-item-action").text(searchQuery);
        $(".history-list").append(li);



        console.log("Button works:)");
        console.log(searchQuery);
       findWeather(searchQuery);
    })

    $(".history-list").on("click", function(){
        findWeather($(this).text());
    })
})

const apiKey = "ff48a5f39420daf03bb09b9e21c6fe87";

function findForecast(city){
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey,
    }).then(function(response){

        console.log(response);
    })
}

function findWeather(city){
    $.ajax({
        method:"GET",
        url:"http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apiKey,
    }).then(function(response){
        console.log(response);

        $(".current-day").empty();

        let todayCard = $("<div>").addClass("card");
        let location = $("<h4>").addClass("card-header").text(response.name + " " + new Date().toLocaleDateString());
        let temperature = $("<p>").addClass("card-text").text("Temperature: " + Math.round((response.main.temp-273.15)*(9/5) +32) + " degrees Farenheit");
        let humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
        let windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + Math.round(response.wind.speed * 2.237) + " MPH");
        let weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

        temperature.append(weatherImage);
        todayCard.append(location, temperature, humidity, windSpeed);
        $(".current-day").append(todayCard);
    })
}