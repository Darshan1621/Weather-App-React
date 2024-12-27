import React from "react";
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import { useState } from "react";
const WeatherApp=()=>{
 let api_key="886705b4c1182eb1c69f28eb8c520e20";
 const [isContentVisible, setContentVisible] = useState(false);
 const [error,setError]=useState("");
 const [wicon,setwicon]=useState(cloud_icon);
 const search=async ()=>{
   const element=document.getElementsByClassName("cityInput");
   if(element[0].value.trim()===""){
     return 0;
   }
   let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
   let response=await fetch(url);
   
   if (response.ok) {
     setError("Enter a city name");
     let data = await response.json();
     setContentVisible(true);
     const humidity=document.getElementsByClassName("humidity-percent");
     const wind=document.getElementsByClassName("wind-rate");
     const temperature=document.getElementsByClassName("weather-temp");
     const location=document.getElementsByClassName("weather-location");
     humidity[0].innerHTML=data.main.humidity+"%";
     wind[0].innerHTML=data.wind.speed+"km/h";
     temperature[0].innerHTML=data.main.temp+"℃";
     location[0].innerHTML=data.name;
     setError("");
     if(data.weather[0].icon==="01d" ||data.weather[0].icon==="01n" ){
       setwicon(clear_icon);
     }
     else if(data.weather[0].icon==="02d" ||data.weather[0].icon==="02n" ){
       setwicon(cloud_icon);
     }
     else if(data.weather[0].icon==="03d" ||data.weather[0].icon==="03n" ){
       setwicon(drizzle_icon);
     }
     else if(data.weather[0].icon==="04d" ||data.weather[0].icon==="04n" ){
       setwicon(drizzle_icon);
     }
     else if(data.weather[0].icon==="09d" ||data.weather[0].icon==="09n" ){
       setwicon(rain_icon);
     }
     else if(data.weather[0].icon==="10d" ||data.weather[0].icon==="10n" ){
       setwicon(rain_icon);
     }
     else if(data.weather[0].icon==="13d" ||data.weather[0].icon==="13n" ){
       setwicon(snow_icon);
     }
     else{
       setwicon(clear_icon);
     }
   }
   else{
    setContentVisible(false);
    setError("Invalid city name. Please enter a valid city name.");
      
    }
  
  
}
 return (
  // <div className="body" style={{background:`url(${wicon})`}}>
   <div className="container" >
     <div className="top-bar">
       <input type="text" className="cityInput" placeholder="Search" />
       <div className="search-icon" onClick={()=>{search();}}>
         <img src={search_icon} alt="" height="20"/>
       </div>
     </div>
     <div className="weather-location"></div>
    {error && <p className="error-message">{error}</p>}
     
    {!error && !isContentVisible && <p>Enter a city name</p>}
    
     <div className="weather-image">
       <img src={wicon} height="150" width="150" alt="" />
    </div>
    <div className="weather-temp"></div>
    

      {/* <div className={`content ${isContentVisible ? 'show' : ''}`}> */}

    <div className="data-container">
      <div className="element">
        <img src={humidity_icon} alt="" className="icon"/>
        <div className="data">
          <div className="humidity-percent"></div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={wind_icon} alt="" className="icon"/>
        <div className="data">
          <div className="wind-rate"></div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </div>

// </div>
)
}

export default WeatherApp;