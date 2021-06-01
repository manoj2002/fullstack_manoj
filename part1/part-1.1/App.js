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
      <Content part={part1} exercise={exercises1} />
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
    <p>{p.part} {p.exercise}</p>
  )
}
const Total = (t) => {
  return (
    <p>{t.total} {t.ex}</p>
  )
}
export default App