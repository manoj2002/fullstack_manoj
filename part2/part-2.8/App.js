import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '040-123456',
      id:1,  
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNum,setNewNum] =useState('')

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
        setPersons(persons.concat(personObject))
        setNewName('') 
        setNewNum('')
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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName}
           onChange={handlePersonChange}/>
        </div><br></br>
        <div>
          Number:<input value={newNum}
            onChange={handleNumberChange}/>
        </div><br></br>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}
const Person =({person}) =>{
  return(
    <p>{person.name} &nbsp; {person.number}</p>
  )
}
export default App