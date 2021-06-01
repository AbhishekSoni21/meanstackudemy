var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');


var app = express();

const route=require('./route/routes.js');

mongoose.connect('mongodb://localhost:27017/shoppingList');
mongoose.connection.on('connected',()=>{
    console.log('connected to Mongodb')
})

mongoose.connection.on('error',(err)=>{
    console.log('error occured',err);
});

const PORT=3000;

app.use(cors());

app.use(bodyparser.json())

app.use('/api',route);

app.get('/',(req,res)=>{

    res.send("Roger am here dude")
})

app.listen(PORT,()=>{
    console.log("server started at port",PORT)
})