import style from './Search.module.css'
import { useEffect, useRef, useState } from 'react'
import locationIcon from '/main-2 icons/location-icon.png'
import searchIcon from '/main-2 icons/search-icon.png'

function Search({getCords: sendCords, getBlurr: sendBlur}) {
  const [isHovered, setHover] = useState(false)
  const [search, setSearch] = useState("")
  const [show, setShow] = useState(false)
  const [data, setData] = useState([{name: "No City", province: "No Province", country: "No Country"}])
  const [cords, setCords] = useState({lat: 0, lon: 0})
  const [info, setInfo] = useState({name: "", country: ""})
  const inputSearch = useRef()

  function handleChange(event){
    setSearch(event.target.value)
  }

  async function fetchGeoCode(){
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`)
    const info = await response.json()
    if(info.results !== undefined){
      setData([...info.results])
    }else{
      setData([{name: "No City", province: "No Province", country: "No Country"}])
    }
  }

  function formatProvince(location){
    let province = ""
    if(location.admin3 !== undefined){
      province = province + location.admin3
    }
    if(location.admin2 !== undefined){
      province = `${province}, ${location.admin2}`
    }
    if(location.admin1 !== undefined){
      province = `${province}, ${location.admin1}`
    }
    return province
  }

  //handles when i choose that city then the lat and lon of it is set to cords
  function handleClick(lat, lon, cityName, countryName){
    setCords({lat, lon})
    setSearch("")
    setInfo({name: cityName, country: countryName})
  }
  const formRef = useRef();

  useEffect(()=>{
    if(isHovered){
      inputSearch.current.focus()
      setShow(true)
    }else if(!isHovered && search !== ""){
      setShow(true)
    }else if(!isHovered && search == ""){
      setShow(false)
      inputSearch.current.blur()
    }
    
  }, [isHovered, search])

  useEffect(()=>{
    fetchGeoCode()
  }, [search])

  useEffect(()=>{
    sendCords(cords)
    console.log(cords);
  }, [cords])

  useEffect(()=>{
    sendBlur(show)
  }, [show])
  return (
    <>
      <form className={style["search-container"]}>
          <img src={locationIcon} alt="location-icon" className={show ? style["location-icon-hidden"] : style["location-icon"]}/>
          <p className={show ? style["location-hidden"] : style["location"]} >{`${info.name}, ${info.country}`} </p>
          <div className={style["search-icon-container"]} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
              <input type="text" className={show ? style['search-input-hover'] : style['search-input']} ref={inputSearch} onChange={()=>{handleChange(event)}} value={search}/>
              <img src={searchIcon} alt="search-icon" className={style["search-icon"]} /> 
          </div>
          <table className={show ? style['results-table'] : style["results-table-hidden"]}>
            <tbody>
              <tr className={style['results-head']} key={1}>
                    <th key={2}>City</th>
                    <th key={3}>Province</th>
                    <th key={4}>Country</th>
                </tr>
                {data.filter((value)=>{
                  return search.toLowerCase() === '' ? value : value.name.toLowerCase().includes(search)
                }).map((value, index)=> {
                  return(
                    <tr className={style['results']} key={crypto.randomUUID()} onClick={()=>{handleClick(value.latitude, value.longitude, value.name, value.country)}}>
                        <td key={crypto.randomUUID()}>{value.name}</td>
                        <td key={crypto.randomUUID()}>{formatProvince(value)}</td>
                        <td key={index}>{value.country}</td>
                    </tr>
                  )
                }
                )}
            </tbody>
              
          </table>
      </form>
    </>
  )
}

export default Search


