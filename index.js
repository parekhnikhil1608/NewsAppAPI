const sql = require('mssql')
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT
const countryApi = require('./routers/country')
const loginApi = require('./routers/login') 
const dbConnection = require('./db')

dbConnection()
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/',countryApi)
app.use('/login',loginApi)

app.listen(port,()=>{
    console.log('app Listening on port '+port)
})

