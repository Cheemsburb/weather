import style from './Forecast.module.css'
import ForecastCard from './ForecastCard'
import { useState, useEffect } from 'react'



function Forecast({getData: sendUv, cords}){
    const [forecast, setForecast] = useState({date: "0000-00-00", icon: 0 , temp: 0, uv: 0})
    const days = [0, 1, 2, 3, 4]

    async function fetchForecast(){
        const response =  await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cords.lat}&longitude=${cords.lon}&daily=weather_code,temperature_2m_max,uv_index_max&timezone=auto&forecast_days=5`)
        const data = await response.json();
        return({date: data.daily.time, icon: data.daily.weather_code, temp: data.daily.temperature_2m_max, uv: data.daily.uv_index_max})

    }

    useEffect(()=>{
        fetchForecast().then((value)=>{
            setForecast(value)
            sendUv(value.uv[0])
        })
    }, [cords])

    return(
        <div className={style['forecast-weather']}>
            {days.map((value)=> <ForecastCard key={value} date={forecast.date[value]} code={forecast.icon[value]} temp={forecast.temp[value]}></ForecastCard>)}
        </div>
    )
}
 

export default Forecast