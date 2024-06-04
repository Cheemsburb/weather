import { useEffect, useState } from 'react'
import style from './AqiUV.module.css'


function AqiUV({uvIndex, cords}){
    const [aqi, setAqi] = useState(0);
    
    async function fetchAqi(){
        const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${cords.lat}&longitude=${cords.lon}&current=us_aqi&timezone=auto&forecast_days=1`)
        const data = await response.json()
        return (data.current.us_aqi)
    }

    function formatAqi(){
        if(0 <= aqi <= 50){
            return "Good"
        }else if(51 >= aqi <=100){
            return "Moderate"
        }else if(101 >= aqi <= 150){
            return "Slightly Unhealthy"
        }else if(151 >= aqi <= 200){
            return "Unhealthy"
        }else if(201 >= aqi <=300){
            return "Very Unhealthy"
        }else if(aqi >= 301){
            return "Hazardous"
        }

    }

    function formatUv(){
        if(uvIndex <= 2){
            return "Low"
        }else if(3 >= uvIndex <= 5){
            return "Moderate"
        }else if(6 >= uvIndex <= 7){
            return "High"
        }else if(8 >= uvIndex <= 10){
            return "Very high"
        }else if(11 > uvIndex){
            return "Extreme"
        }
    }
    useEffect(()=>{
        fetchAqi().then((value)=>{
            setAqi(value)
        })
    }, cords)
    
    return(
        <div className={style.container}>
            <div className={style['line-info']}>
                <div className={style.line}></div>
                <div className={style['info-container']}>
                    <p className={style['info-icon']}>i</p>
                </div>
            </div>
            <div className={style['aqiuv-container']}>
                <div className={style['aqi-card']}>
                    <p className={style['title']}> Air Quality</p>
                    <p className={style['value']}>{aqi}</p>
                    <p className={style['remarks']}>{formatAqi(aqi)}</p>
                </div>
                <div className={style['uv-card']}>
                    <p className={style['title']}> UV Index </p>
                    <p className={style['value']}>{uvIndex}</p>
                    <p className={style['remarks']}>{formatUv(uvIndex)}</p>
                </div>
            </div>
        </div>
    )
}


export default AqiUV