import React, { useState } from 'react'
const App = () => {
  const [clicks, setClicks] = useState({
    good:0 , neutral: 0 ,bad:0
  })

  const handlegoodClick = () => {
    const newClicks = { 
      good: clicks.good + 1, 
      neutral: clicks.neutral,
      bad:clicks.bad 
    }
    setClicks(newClicks)
  }

  const handleneutralClick = () => {
    const newClicks = { 
      good: clicks.good, 
      neutral: clicks.neutral+1,
      bad:clicks.bad 
    }
    setClicks(newClicks)
  }

  const handlebadClick = () => {
    const newClicks = { 
      good: clicks.good, 
      neutral: clicks.neutral,
      bad:clicks.bad+1
    }
    setClicks(newClicks)
  }
  const all=clicks.good +clicks.neutral+clicks.bad ;
  const avg=clicks.good*1+clicks.neutral*0+clicks.bad*-1;
  const click={
    good: clicks.good,
    bad:clicks.bad,
    neutral:clicks.neutral,
    all:all,
    avg:avg
  }
  
  return (
    <div >
      <p>GIVE YOUR FEEDBACK</p>
      <Button click={handlegoodClick} text="GOOD" />
      <Button click={handleneutralClick} text="NEUTRAL" />
      <Button click={handlebadClick} text="BAD" />
      <p >STATISTICS</p>
      <table>
        <History click={click}/>
      </table>
      
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.click}>
      {props.text}
    </button>
  )
}
const Statistics = (p) =>{
  return(
  <tr>
    <td>{p.text}:</td>
    <td>{p.click}</td>
    <td>{p.per}</td>
  </tr>
  )
}
const History = (p) => {
  if (p.click['good'] === 0 && p.click['bad'] === 0 && p.click['neutral'] === 0) {
    return(
      <tbody>
        <tr>
        <td>NO STATISTICS ARE AVAILABLE</td>
        </tr>
      </tbody>
      
        
    )
  }
    
  return (
    <tbody>
      <Statistics text="GOOD" click={p.click['good']} per=" " />
      <Statistics text="NEUTRAL" click={p.click['neutral']} per=" "/>
      <Statistics text="BAD" click={p.click['bad']} per=" "/>
      <Statistics text="ALL" click={p.click['all']} per=" "/>
      <Statistics text="AVERAGE" click={p.click['avg']*100/p.click['all']} per="%"/>
      <Statistics text="POSITIVE" click={p.click['good']*100/p.click['all']} per="%"/>
      </tbody>
  )
}
export default App;
