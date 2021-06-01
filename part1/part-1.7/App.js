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
      <p>GOOD: {clicks.good}</p>
      <p>NEUTRAL: {clicks.neutral}</p>
      <p>BAD: {clicks.bad}</p>
      <p>ALL: {all}</p>
      <p>AVERAGE: {avg*100/all} %</p>
      <p>POSITIVE : {clicks.good*100/all} %</p>
    </div>
  )
}
export default App;
