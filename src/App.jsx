import './App.css'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import Search from './Search'
import SunTime from './SunTime'
import AqiUV from './AqiUV'
import Footer from './Footer'
import {useState} from 'react'


function App() {
  const [uv, setUv] = useState(0);
  const [location, setLocation] = useState({lat: 0, lon: 0})
  const [blur, setBlur] = useState(false)

  function getUv(data){
    setUv(data)
  }

  function getLocation(data){
    setLocation({...data})
  }

  function getBlur(data){
    setBlur(data)
  }

  return (
    <div className='body'>
      <div className='main-1'>
            <CurrentWeather cords={location}></CurrentWeather>
            <Forecast getData={getUv} cords={location}></Forecast>
        </div>
        <div className="main-2">
            <Search getCords={getLocation} getBlurr={getBlur}></Search>
            <SunTime show={blur} cords={location}></SunTime>
            <AqiUV uvIndex={uv} show={blur} cords={location}></AqiUV>
            <Footer show={blur}></Footer>
        </div>
    </div>
  )
}

export default App
