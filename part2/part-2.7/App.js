import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      id:1,  
    }
  ]) 
  const [ newName, setNewName ] = useState('')
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
      id: persons.length+1
    }
    if(checkperson())
      {
        setPersons(persons.concat(personObject))
        setNewName('') 
      }
    else
    {
      alert(`${newName} already added to phonebook`);
    }
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
           onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person.name} />
        )}
      </ul>
    </div>
  )
}
const Person =({person}) =>{
  return(
    <p>{person}</p>
  )
}
export default App