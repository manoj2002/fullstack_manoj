require('dotenv').config()

const PORT = process.env.PORT
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD=process.env.MONGO_PASSWORD
module.exports = {
  MONGO_USER,
  MONGO_PASSWORD,
  PORT
}