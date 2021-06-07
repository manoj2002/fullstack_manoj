require('dotenv').config()
const express=require('express')
const app=express()
app.use(express.json())
const Person = require('./models/person')
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
morgan.token('data', (req) => {
  return req.method === 'POST'
    ? JSON.stringify(req.body)
    : null
})


app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req, res)
  ].join(' ')
}))

  app.get('/' , (request,response) => {
      response.send("<h1>Welcome to Phone Book Application</h1>")
  })
  app.get('/api/persons', (request,response) =>{
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
  app.get('/api/info',(request,response) => {
     const d=new Date();
     const l=Person.find({}).then(persons => {
      response.send(`<p>PhoneBook Has Info For ${persons.length} People</p><p>${d}</p>`)
    });
  })
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })
  app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })
  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({ error: 'name or number missing' })
    }
    const person = new Person({
      name:body.name,
      number:body.number
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  app.use(errorHandler)
  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })