const express = require("express")
const morgan = require("morgan")
const app = express()
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.get('/', (req,res) => {
  res.status(200).send('Hello World!')
})

module.exports = app;