import style from './SunTime.module.css'
import { useState, useEffect } from 'react'

function SunTime({show, cords}){
    const [time, setTime] = useState({sunriseTime: "0:00", sunsetTime: "0:00"})

    async function fetchTime(){
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cords.lat}&longitude=${cords.lon}&daily=sunrise,sunset&timezone=auto&forecast_days=1`)
        const data =  await response.json()

        return({sunrise: data.daily.sunrise, sunset: data.daily.sunset})
    }

    useEffect(()=>{
        fetchTime().then((value)=>{
            const sunriseExtracted = value.sunrise[0].slice(-4)
            const sunsetExtracted =  value.sunset[0].slice(-5)
            const sunsetInt = parseInt(sunsetExtracted.slice(0, 2)) % 12
            const sunsetMin = sunsetExtracted.slice(2, 5)
            const sunsetStr = `${sunsetInt}${sunsetMin}`
            setTime(()=>({sunriseTime: sunriseExtracted, sunsetTime: sunsetStr}))
        })
    },[cords])

    function formatGoldenHourTime(time){
        const timeHour = parseInt(time[0] - 1);
        const timeMinute = time.slice(1, time.lenght)
        return `${timeHour}${timeMinute}`
    }

    return(
        <div className={show ? style["container-blur"] : style.container}>
            <div className={style["sunrise-container"]}>
                <p className={style["sunrise-title"]}>Sunrise</p>
                <div className={style["sunrise-design-container"]}>
                    <img src="/main-2 icons/sunrise.png" alt="sunrise-icon" className={style["sunrise-icon"]}/>
                    <p className={style["sunrise-time"]}>{time.sunriseTime}</p>
                </div>
            </div>
            <div className={style["goldenhour-container"]}>
                <p className={style["goldenhour-title"]}>Golden Hour</p>
                <div className={style["goldenhour-design-container"]}>
                    <img src="/main-2 icons/sun.png" alt="goldern hour icon" className={style["goldenhour-icon"]}/>
                    <p className={style["golden-time-am"]}>{formatGoldenHourTime(time.sunriseTime)} <span className={style.meridiem}>AM</span></p>
                    <p className={style["golden-time-pm"]}>{formatGoldenHourTime(time.sunsetTime)} <span className={style.meridiem}>PM</span></p>
                </div>
            </div>
            <div className={style["sunset-container"]}>
                <p className={style["sunset-title"]}> Sunset </p>
                <div className={style["sunset-design-container"]}>
                    <img src="/main-2 icons/sunset-.png" alt="sunset-icon" className={style["sunset-icon"]} />
                    <p className={style["sunset-time"]}>{time.sunsetTime}</p>
                </div>
            </div>
        </div>
    )
}


export default SunTime