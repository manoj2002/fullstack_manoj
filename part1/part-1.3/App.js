import React from 'react'

const App = () => {
  const course = 'Half Stack application development'

  const part1 ={
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 ={
    name:  'Using props to pass data' ,
    exercises: 7
  }
  const part3 ={
    name: 'State of a component',
    exercises: 14
  }
  const td='Number of exercises'

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total  total={td} ex={part1.exercises+ part2.exercises + part3.exercises}/>
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
      <Part part={p.part1} />
      <Part part={p.part2} />
      <Part part={p.part3} />
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
    <p>{t.total} {t.ex}</p>
  )
}
export default App