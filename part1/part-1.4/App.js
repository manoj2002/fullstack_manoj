import React from 'react'

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part={parts} />
      <Total  part={parts}/>
    </div>
  )
}
const Header = (p) => {
  return(
    <h1>{p.course}</h1>
  )
}
const Content = (p) =>{
  return (
    <div>
      <Part part={p.part[0]} />
      <Part part={p.part[1]} />
      <Part part={p.part[2]} />
    </div>
  )
}
const Part =(p) =>{
  return(
    <p>{p.part['name']} {p.part['exercises']} </p>
  )
}
const Total = (t) => {
  return (
    <p>{'Number of Exercises'} {t.part[0].exercises+t.part[1].exercises+t.part[2].exercises}</p>
  )
}
export default App