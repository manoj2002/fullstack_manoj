import React, { useState,useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import AddPersonForm from "./components/AddPersonForm"

import axios from 'axios'


const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNum,setNewNum] =useState('')
  const [filter,setFilter]=useState('')

  //
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
   

  //to check whether person exists or not
  function checkperson (){
     const x=persons.map(person => 
      person.name === newName)
      console.log(x.includes(true))
      if( x.includes(true))
         return (false)
      else
         return (true)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number:newNum,
      id: persons.length+1
    }
    if(checkperson())
      {
        axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('') 
          setNewNum('')
        })
        
      }
    else
    {
      alert(`${newName} already added to phonebook`);
    }
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange =(event) =>{
    setNewNum(event.target.value)
  }
  const handleFilter=(event) =>{
    setFilter(event.target.value)
  }
  const showperson = filter === "" ? persons:persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handle={handleFilter}/>
      <h3>Add Person</h3>
      <AddPersonForm value1={newName} value2={newNum} handlep={handlePersonChange} handlen={handleNumberChange} add={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={showperson} />
    </div>
  )
}
export default App