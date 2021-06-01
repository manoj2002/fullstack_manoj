import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const td='Number of exercises'

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercise1={exercises1} exercise2={exercises2} exercise3={exercises3} />
      <Total  total={td} ex={exercises1 + exercises2 + exercises3}/>
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
      <Part part={p.part1} exercise={p.exercise1} />
      <Part part={p.part2} exercise={p.exercise2} />
      <Part part={p.part3} exercise={p.exercise3} />
    </div>
  )
}
const Part =(p) =>{
  return(
    <p>{p.part} {p.exercise}</p>
  )
}
const Total = (t) => {
  return (
    <p>{t.total} {t.ex}</p>
  )
}
export default App