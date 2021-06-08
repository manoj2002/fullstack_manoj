const mongoose = require('mongoose')
const password=process.env.MONGOPASSWORD
const url = `mongodb+srv://fullstack:${password}@cluster0.jq6ml.mongodb.net/phonebook-app?retryWrites=true&w=majority`
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:true
    },
    number: {
        type:String,
        required:true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)