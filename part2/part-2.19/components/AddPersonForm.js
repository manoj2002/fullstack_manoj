import React from 'react'
const AddPersonForm =(prop) =>{
    return(
      <div>
      <form onSubmit={prop.add}>
        <div>
          Name: <input value={prop.value1}
           onChange={prop.handlep}/>
        </div><br></br>
        <div>
          Number:<input value={prop.value2}
            onChange={prop.handlen}/>
        </div><br></br>
        <div>
          <button className="btn" type="submit">add</button>
        </div>
      </form>
    </div>
    )
}
export default AddPersonForm