import React, { useState,useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import AddPersonForm from "./components/AddPersonForm"
import ps from "./services/Persondata"


const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNum,setNewNum] =useState('')
  const [filter,setFilter]=useState('')

  //
  useEffect(() => {
    ps
     .getAll()
      .then(data => {
        setPersons(data)
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
        ps
        .create(personObject)
        .then(returnedperson => {
          setPersons(persons.concat(returnedperson))
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
  const personDelete =(id,name) => {
      if(window.confirm(`Are You Sure To Delete ${name}`))
      {
          ps.remove(id);
          setPersons(persons.filter( person => person.id !== id));
      }
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
      <Persons persons={showperson}handle={personDelete} />
    </div>
  )
}
export default App