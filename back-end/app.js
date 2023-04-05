const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const app = express()
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

error_message = 'Unable to access request resources, please refine search or try again later...'

app.use(morgan('tiny'))
app.use(cors())
app.get('/', (req,res) => {
  res.status(200).send('Hello World!')
})

app.get('/items', (req,res) => {
  knex
    .select('*')
    .from('items')
    .then(data => { res.status(200).send(data)})
    .catch((err) => {
      console.log(err)
      res.status(404).send('Unable to access request resources, please try again later...')
    })
})

module.exports = app;