const express = require('express')

const app = express()

const mongoose = require('mongoose')
 
// app.use(express.urlencoded())

app.use(express.json())

const cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json());

const MONGODB_URL = "mongodb://localhost:27017/token_practice"

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log(`${MONGODB_URL} connection succesfull..`)
})
.catch((err)=>{
    console.error("Error in connecting to mogodb",err)
})

app.use(require('./Router/UserRouter'))

app.listen(8000,()=>{
    console.log("Port is 8000")
    
})