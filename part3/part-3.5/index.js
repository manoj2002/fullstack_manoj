const { request, response } = require('express')
const express=require('express')
const app=express()
app.use(express.json())
let persons=[
  { name: 'Arto Hellas',
  number: '040-123456',
  id:1,  
},
{ name: 'manoj',
  number: '040-123465986',
  id:2,  
},
{ name: 'manoj rajulapati',
  number: '057-45756',
  id:3,  
},
{
 name: 'binkauy',
number: '540-1548956',
id:4,  
}
]
  app.get('/' , (request,response) => {
      response.send("<h1>Welcome to Phone Book Application</h1>")
  })
  app.get('/api/persons', (request,response) =>{
      response.json(persons)
  })
  app.get('/api/info',(request,response) => {
     const d=new Date();
     const l=persons.length;
     response.send(`<p>PhoneBook Has Info For ${l} People</p><p>${d}</p>`)
  })
  app.get('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person)
    {
        response.json(person)
    }
    else{
        response.status(404).end()
    }
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
     console.log(persons)
    response.status(204).end()
  })
  const newId = () => {
    const max = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return max + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
     const person = {
      name: body.name,
      number: body.number,
      id: newId(),
    }
    persons = persons.concat(person)
    response.json(person)
  })
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)