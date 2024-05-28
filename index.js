const search = document.querySelector(".search input");
const btn = document.getElementById("btn");
const main_img = document.querySelector(".weather_icon");
const humid_img = document.getElementById("humid");
const wind_img = document.getElementById("wind");
const cty = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const locationbtn = document.getElementById("location");


const apikey = "53f60664d2c4cf987d578a85e50514f0";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(url){
    const response = await fetch(url);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
    let data = await response.json();

    cty.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        main_img.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        main_img.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        main_img.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        main_img.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        main_img.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
      // console.log(data);
      document.getElementsByClassName("search").style.marginbottom= "-50px";
    }
}

locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }else{
        alert("Your Browser do not support geolocation.....")
    }
});

const onSuccess = (position)=>{
    console.log(position);
    let {latitude,longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
    checkWeather(api);
}

const onError = (error)=>{
    console.log(error);
    // alert("User Denied the location.......");
}
search.addEventListener("keypress",function(evente){
    if (evente.key === "Enter") {
       
        
        document.getElementById("btn").click();
      }
});

// input.addEventListener("keypress", function(event) {
//     // If the user presses the "Enter" key on the keyboard
//     if (event.key === "Enter") {
//       // Cancel the default action, if needed
//       event.preventDefault();
//       // Trigger the button element with a click
//       document.getElementById("myBtn").click();
//     }
//   });


btn.addEventListener("click",()=>{
    checkWeather(apiUrl + search.value + `&appid=${apikey}`);
})
