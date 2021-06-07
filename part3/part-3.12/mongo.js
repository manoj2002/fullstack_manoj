const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
else if(process.argv.length >= 3)
{
    const password = process.argv[2]
    const url =
    `mongodb+srv://fullstack:${password}@cluster0.jq6ml.mongodb.net/phonebook-app?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
       })
      const Person = mongoose.model('Person', personSchema)
    if(process.argv.length === 3)
    {
        Person.find({}).then(result => {
            result.forEach(person => {
              console.log(person)
            })
            mongoose.connection.close()
          })
    }
    else
    {
        const pname=process.argv[3]
        const pnum=process.argv[4]
        const person=new Person({
            name:pname,
            number:pnum
        })
       person.save().then(result => {
        console.log(`Added ${person.name} ${person.number} To Phonebook` )
        mongoose.connection.close()
      })
    }
}

