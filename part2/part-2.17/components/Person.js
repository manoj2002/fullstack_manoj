import React from 'react'
const Person =({person,handle}) =>{
    return(
      <p>{person.name} &nbsp; {person.number} &nbsp; &nbsp;<button  onClick={()=>handle(person.id,person.name)}>Delete</button></p>
    )
}
export default Person