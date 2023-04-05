const express = require('express')
const app = require('./app')
require("dotenv").config()
const port = process.env.SERVER_PORT || 3001;


app.listen(port, ()=> console.log(`Server listening on port ${port}`))