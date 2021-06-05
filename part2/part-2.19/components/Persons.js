import React from 'react'
import Person from "./Person"
const Persons= ({persons,handle}) =>{
    return(
        <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} handle={handle}/>
        )}
     </ul>
    
     
    )
}
export default Persons