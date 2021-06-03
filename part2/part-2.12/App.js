import {useEffect, useState} from 'react';
import axios from 'axios';
const  App = () => {
  const [country,setCountry] =useState([])
  const [filter,setFilter]=useState('')
  const handleFilterChange=(event) =>{
    setFilter(event.target.value)
  }
  useEffect(() => {
    console.log('effect')
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
         !(Array.isArray(showCountry()))?showCountry():showCountry().length===1?showCountry().map(country => <DispCountry  country={country} language={country.languages} />) : showCountry().map(country => <Country  country={country} /> 
        )}
      </ul>
      </div>
     
    </div>
  )
}
const Country =({country}) =>{
  return(
    <p>{country.name}</p>
  )
}
const DispCountry=({country,language}) =>{
  console.log(country)
  return(
    <div>
        <h1>{country.name}</h1>
        <p>Capital :  {country.capital} </p>
        <p>Population : {country.population}</p>
        <div><h1>Languages :</h1>{language.map(lang => 
          <p>&nbsp; &nbsp;{lang.name}</p>
          )}</div>
        <img src={country.flag} width="10%" height="10%" alt="CountryFlag"/>
    </div>
    
  )
}

export default App;
