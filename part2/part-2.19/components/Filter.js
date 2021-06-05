import React from 'react'
const Filter = ({value,handle}) =>{
    return(
      <div>
          Enter Name To Filter: <input onChange={handle}   value={value} />
      </div>
       
    )
}
export default Filter