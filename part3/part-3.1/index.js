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
  
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)