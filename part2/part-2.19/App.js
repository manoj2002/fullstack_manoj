import React, { useState,useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import AddPersonForm from "./components/AddPersonForm"
import ps from "./services/Persondata"
import Notification from './components/Notification'
const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNum,setNewNum] =useState('')
  const [filter,setFilter]=useState('')
  const [message, setMessage] = useState(null)

  //
  useEffect(() => {
    ps
     .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])
   //to check whether person exists or not
  const checkPerson = persons.find(person => 
    person.name.toLowerCase() === newName.toLowerCase())
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number:newNum
    }
    if(checkPerson)
    {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`))
      {
        const updatedperson={...checkPerson,number:newNum}
        ps.update(checkPerson.id,updatedperson)
        .then(person => {
          setPersons(persons.filter((p) => p.name !== person.name)
          .concat(person))
          setMessage({text:`${person.name} has  updated`,type:"success"})
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.name !== checkPerson.name));
          setMessage({text: `${checkPerson.name} has already been deleted from the server`,type: "error",});
          setTimeout(() => setMessage(null), 5000);
        });
      }   
      return ; 
    }
    else{
      ps.create(personObject)
      .then(returnedperson => {
        setPersons(persons.concat(returnedperson))
        setNewName('') 
        setNewNum('')
        setMessage({text:`${returnedperson.name} Added Successfully`,type:"success" })
        setTimeout(() => setMessage(null), 5000);
      })
      .catch((error) => {
        setMessage({ text: error.response.data.error, type: "error" });
        setTimeout(() => setMessage(null), 5000);
        console.error(error);
      });
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
          setMessage({text:`${name} deleted successfully`,type:"success"});
          setTimeout(() => setMessage(null), 5000);
      }
  }
  const showperson = filter === "" ? persons:persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

    
  return (
    <div>
      <Notification message={message}/>
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