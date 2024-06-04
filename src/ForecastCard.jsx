import style from './ForecastCard.module.css'

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

function ForecastCard({date, code, temp}){

    function formatDay(){
        const dayNow = new Date(date);
        let dayNum = dayNow.getDay()
        let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        let day = daysOfWeek[dayNum]
    
        return `${day}`
    }

    function setIcon(){
        switch(code){
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
        if(code === 45 || 48){
            return fog;
        } else if(code === 56 || 57 || 66 || 67 || 71 || 73 || 75 || 77 || 85 || 86){
            return snow;
        }else if(code === 51 || 53 || 55){
            return drizzle;
        }else if(code ===  61 || 63 || 65 || 80 || 81 || 82){
            return rainIcon;
        }else if(code === 96 || 99){
            return thunderHail;
        }
    }

    return(
        <div className={style.card}>
            <p className={style.temp}> {Math.round(temp)}°C</p>
            <img src={setIcon()} alt="weather code" className={style['weather-icon']} />
            <p className={style.day}>{formatDay()}</p>
        </div>
    )
}


export default ForecastCard