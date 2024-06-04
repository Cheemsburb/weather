import style from './CurrentWeather.module.css'

import wind from '/main-1 icons/infos/wind.png'
import hum from '/main-1 icons/infos/humidity.png'
import rain from '/main-1 icons/infos/rain.png'
import { useState, useEffect } from 'react'

// Weather code icons
import clear from '/main-1 icons/sun.png'
import mainlyClear from '/main-1 icons/mainly-clear.png'
import partlyClear from '/main-1 icons/partly-cloudy.png'
import overcast from '/main-1 icons/overcast.png'
import fog from '/main-1 icons/fog.png'
import drizzle from '/main-1 icons/drizzle.png'
import rainIcon from '/main-1 icons/rain.png'
import thunderSlight from '/main-1 icons/thunder-slight.png'
import thunderHail from '/main-1 icons/thunder-hail.png'
import snow from '/main-1 icons/snow.png'


function CurrentWeather({cords}){
    const [currentWeather, setCurrentWeather] = useState({})
    const [date, setDate] = useState(new Date())
  
    useEffect(()=>{
        const dateInterval = setInterval(()=>{
            setDate(new Date())
        }, 1000)
  
        return ()=>{
          clearInterval(dateInterval)
        }
    }, [])

  
    function formatTime(){
      let hours = date.getHours() % 12
      let minutes = date.getMinutes()
      let meridiem = hours >= 12 ? "am" : "pm"
      
      function appendZero(time){
        if(time < 10){
            return ("0" + time)
        }else{
            return (time)
        }
      }
      
        
      return(`${hours}:${appendZero(minutes)}${meridiem}`)
    }
  
    function formatDay(){
      let dayNum = date.getDay()
      let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      let day = daysOfWeek[dayNum]
  
      return `${day}`
    }
  
    function formatDate(){
      let dayNum = date.getDate()
      let monthNum = date.getMonth()
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      let month = months[monthNum]
      let day;
      const year = date.getFullYear() % 100
      if(dayNum === 11 || dayNum === 12 || dayNum === 13){
        day = dayNum + 'th'
      } else{
        switch(dayNum % 10){
            case 1:
                day = dayNum + "st"
                break;
            case 2:
                day = dayNum + "nd"
                break;
            case 3:
                day = dayNum + "rd"
                break;
            default:
                day = dayNum + "th"
        }
      }

      return(`${day} ${month} ‘${year}`)
    }

    async function fetchCurrentWeather(){
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cords.lat}&longitude=${cords.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`)
        const {current} = await response.json()
        return({temp: current.temperature_2m, hum: current.relative_humidity_2m, rain: current.precipitation, wind: current.wind_speed_10m, icon: current.weather_code})
        
    }

    useEffect(()=>{
        let weather = fetchCurrentWeather()
        weather.then((value)=>{
            setCurrentWeather(()=>(value))
        })
    }, [cords])

    function setIcon(){
        switch(currentWeather.icon){
            case 0:
                return clear;
            case 1:
                return mainlyClear;
            case 2:
                return partlyClear;
            case 3:
                return overcast;
            case 95:
                return thunderSlight;
        }
        if(currentWeather.icon === 45 || 48){
            return fog;
        } else if(currentWeather.icon === 56 || 57 || 66 || 67 || 71 || 73 || 75 || 77 || 85 || 86){
            return snow;
        }else if(currentWeather.icon === 51 || 53 || 55){
            return drizzle;
        }else if(currentWeather.icon ===  61 || 63 || 65 || 80 || 81 || 82){
            return rainIcon;
        }else if(currentWeather.icon === 96 || 99){
            return thunderHail;
        }
    }

    return(
        <div className={style["current-weather"]}>
            <img className={style['weather-icon']} src={setIcon()} alt="weather-code-icon" />
            <div className={style['temp-container']}>
                <p className={style.temp}>{String(Math.round(currentWeather.temp))}</p>
                <span className={style['temp-unit']}>°c</span>
            </div>
            <p className={style.date}>{formatDate()}</p>
            <div className={style['day-time-container']}>
                <p className={style.day}>{formatDay()}</p>
                <div className={style.hrline}></div>
                <p className={style.time}> {formatTime()}</p>
            </div>
            
            <div className={style.infos}>
                <img src={wind} alt="wind-icon" className={style['wind-icon']}/>
                <p className={style.wind}> Wind {currentWeather.wind}km/h </p>
                <div className={style.line}></div>
                <img src={hum} alt="hum-icon" className={style['hum-icon']} />
                <p className={style.humidity}> Hum {currentWeather.hum}% </p>
                <div className={style.line}></div>
                <img src={rain} alt="rain-icon" className={style['rain-icon']}/>
                <p className={style.rain}> Rain  {currentWeather.rain}mm</p>
            </div>
        </div>
    )
}

export default CurrentWeather