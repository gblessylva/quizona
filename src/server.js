const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const routes = require('./routes/route')

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.connect(process.env.DB_URL, {
useNewUrlParser:true, useUnifiedTopology:true
})
 

const db=mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('successfully connected to database'))

app.listen(process.env.PORT, ()=>{
    console.log('App listening in port 2020')
}
) 