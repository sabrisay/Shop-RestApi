const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')


app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, PATCH, DELETE')
        return res.status(200).json({})
    }
    next();
})
const ProductRoute = require('./Routes/Product');
app.use('/products',ProductRoute)
const OrderRoute = require('./Routes/Orders');
app.use('/orders',OrderRoute)
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true  }, ()=>{
    console.log('connected to database')
})

mongoose.Promise = global.Promise

app.use((req,res,next)=>{
    res.status(200).json({
        message: "It works"
    });
})



module.exports = app;