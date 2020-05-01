$(document).ready(function(){
    $(".button").on("click", function(){
        const searchQuery = $(".search-form").val();
        $(".search-form").val("");

        var li = $("<li>").addClass("list-group-item list-group-item-action").text(searchQuery);
        $("#history-list").append(li);



        console.log("Button works:)");
        console.log(searchQuery);
       findWeather(searchQuery);
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
    })
}