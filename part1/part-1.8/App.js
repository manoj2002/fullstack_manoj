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
  return (
    <div >
      <p>GIVE YOUR FEEDBACK</p>
      <button onClick={handlegoodClick}>Good</button>
      <button onClick={handleneutralClick}>Neutral</button>
      <button onClick={handlebadClick}>Bad</button>
      <p >STATISTICS</p>

      <Statistics text="GOOD" click={clicks.good} per=" " />
      <Statistics text="NEUTRAL" click={clicks.neutral} per=" "/>
      <Statistics text="BAD" click={clicks.bad} per=" "/>
      <Statistics text="ALL" click={all} per=" "/>
      <Statistics text="AVERAGE" click={avg*100/all} per="%"/>
      <Statistics text="POSITIVE" click={clicks.good*100/all} per="%"/>
    </div>
  )
}
const Statistics = (p) =>{
  return(
  <p>{p.text}: {p.click} {p.per}</p>
  )
}
export default App;
