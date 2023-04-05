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
app.use(express.json())

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


app.get('/item/:id', (req,res) => {
  console.log(req.params.id)
  knex('items')
  .select('*')
  .where('id','=',req.params.id)
  .then(data => {res.status(200).send(data)})
})



app.post('/login', (req,res) => {
  const {username,password} = req.body;

  knex('users').where('username','=',username)
  .then(data => {
    console.log(data[0].password,password)
    if(data[0].password === password) {
      res.status(200).json({username:data[0].username,id:data[0].id})
    } else {
      res.status(401).json("Username Password combination not found, please try again")
    }
  })
})

app.post('/newitem', (req,res) => {
  const {item_name,description,quantity,userid} = req.body;

  knex('items')
  .insert({
    'item_name':item_name,
    'description':description,
    'quantity':quantity,
    'userid':userid
  },"*")
  .then(data => res.status(201).json(data))
  .catch((err) => {
    res.status(404).send(err)
  })
})

app.get('/user/:id', (req,res) => {
  knex('users')
  .where('id','=',req.params.id)
  .then(data => {
    console.log(data)
    res.status(200).json(data[0].username)})
  .catch((err) => {
    res.status(404).send(err)
  })
})


module.exports = app;