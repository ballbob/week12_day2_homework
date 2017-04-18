var express = require('express')
var app = express()
var arachnidRouter = express.Router()
var ArachnidQuery = require('../db/arachnidQuery.js')

var arachnidQuery = new ArachnidQuery()

//all arachnids
arachnidRouter.get('/',function(req,res){
  arachnidQuery.all(function(documents){
    console.log(documents)
    res.json(documents)
  })
})

module.exports = arachnidRouter