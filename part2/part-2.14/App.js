import {useEffect, useState} from 'react';
import axios from 'axios';
const  App = () => {
  const [country,setCountry] =useState([])
  const [filter,setFilter]=useState('')
  const handleFilterChange=(event) =>{
    setFilter(event.target.value)
  }
  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  function showCountry()
  {
      const m=filter === ""?filter:country.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
      const n= m.length<10?m:"To Many Matches"
      return n;
  } 

   
  return (
    <div>
      <h1>Country Filters API'S</h1>
      <div>
          &nbsp;&nbsp;Enter Country Name To Filter:&nbsp;&nbsp;
          <input value={filter} onChange={handleFilterChange}/>
      </div>
      <div>
      <ul>
       {
         !(Array.isArray(showCountry()))?showCountry():showCountry().map(country => <Country key={country.name} country={country} /> 
        )}
      </ul>
      </div>
     
    </div>
  )
}
const Country =({country}) =>{
  const [show,setShow]=useState(false)
  const sh=!show?" ":country
  return(
    <div>
      <p>{country.name} <button onClick={() => setShow(!show)}>show </button></p>
      <div>{sh===" "?" ":<DispCountry country={sh} key={sh.name} language={sh.languages}/>}</div>
    </div>

  )
}
const DispCountry=({country,language}) =>{
  return(
    <div>
        <h1>{country.name}</h1>
        <p>Capital :  {country.capital} </p>
        <p>Population : {country.population}</p>
        <div><h1>Languages :</h1>{language.map(lang => 
          <p>&nbsp; &nbsp;{lang.name}</p>
          )}</div>
        <img src={country.flag} width="10%" height="10%" alt="CountryFlag"/>
        <Weather key={country.name} country={country}/>
    </div>
    
  )
}

const Weather = ({country}) =>{
  const [weather,setWeather]=useState('')
  const m=country.name;
    useEffect(() => {
      
      const params = {
        key:process.env.REACT_APP_WEATHER_API,
        q: m
      }
      axios.get(' http://api.weatherapi.com/v1/current.json', {params})
  .then(response => {
    const apiResponse = response.data;
    setWeather(apiResponse);
    console.log(apiResponse);
  }).catch(error => {
    console.log(error);
  });
    }, [m])
  return (
    <div>
      <h1>Weather In {weather===''?'':weather.location.name}</h1>
      <p>Temperature : {weather===''?'':weather.current.temp_c}</p>
      <img src={weather===''?'':weather.current.condition.icon} alt="condiontion" />
      <p>Wind: {weather===''?'':weather.current.wind_mph} mph In Direction {weather===''?'':weather.current.wind_dir}</p>
    </div>
  )
}


export default App;
