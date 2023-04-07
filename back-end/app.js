const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const cors = require("cors")
// var cookieSession = require('cookie-session')

const app = express()
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
  );
  
var cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST","PATCH","GET","OPTIONS","HEAD","DELETE"],
  credentials: true,
}))

error_message = 'Unable to access request resources, please refine search or try again later...'

app.use(morgan('tiny'))
app.use(express.json())

// app.use(cookieSession({
//   name: 'user_session',
//   httpOnly: true,
//   sameSite: 'strict',
//   secret: 'arereallylongstringwouldgoherethatwasarealkey'
// }))

const store = new KnexSessionStore({
  knex,
  tableName: "sessions",
})

app.use(
  session({
    store: store,
    name: "connect.sid",
    secret: 'reallyreallylongstringthatisafoolproofsecurityplan',
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  })
)

app.post("/validate-session", (req,res) => {
  console.log(req.sessionID,req.session.userData)

  if (req.sessionID && req.session.userData) {
    res.status(200).json(req.session.userData)
  } else {
    res.status(403)
  }

})

app.post('/logout', (req,res) => {
  console.log(req.session)
  try {
    req.session.destroy();
    res.clearCookie('connect.sid')
    console.log(req.session)
    res.status(200).json('User logged out')
  } catch(err) {
    return res.status(500).json('Error processing request')
  }
})

app.post('/login', (req,res,next) => {
  const {username,password} = req.body;
  
  knex('users').where('username','=',username)
  .then(data => {
    if(data[0].password === password) {
      userData = {
        userId:data[0].id,
        username:data[0].username,
      }
      req.session.userData=userData
      res.status(200).json(req.session)
    } else {
        res.status(401).json("Username Password combination not found, please try again")
    }
  })
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

app.get('/item/:id', (req,res) => {
  console.log(req.params.id)
  knex('items')
  .select('*')
  .where('id','=',req.params.id)
  .then(data => {res.status(200).send(data)})
})

app.post('/newitem', (req,res) => {
  const {item_name,description,quantity,userid} = req.body;
  console.log(req.body)

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
    res.status(200).json(data[0].username)})
  .catch((err) => {
    res.status(404).send(err)
  })
})

app.delete('/item/:id', (req,res) => {
  console.log(req.sessionID)
  if (req.sessionID && req.session.userData) {
    knex('items')
      .where('id','=',req.params.id)
      .del()
      .then(data => res.status(200).json(data))
      .catch((err) => {
        res.status(404).send(err)
    })
} else {
  res.status(404)
}
})

app.patch('/item/:id', (req,res) => {
  if (req.sessionID && req.session.userData) {
  knex('items')
    .where('id','=',req.params.id)
    .update(req.body)
    .then(data => res.status(200).json(data))
    .catch((err) => {res.status(404).send(err)})
  } else {
    res.status(404)
  }
})

app.get('/countitems', (req,res) => {
  knex('items').max("id")
  .then(data => res.status(200).json(data))
  .catch(err => res.status(404).send(err))
})

app.all("/*", (req,res) => {
  res.status(404).json(`The requested URL /${req.params['0']} was not found on this server`)
})


module.exports = app;