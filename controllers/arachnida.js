var express = require('express')
var app = express()
var arachnidRouter = express.Router()
var ArachnidQuery = require('../db/arachnidQuery.js')
var ObjectID = require('mongodb').ObjectID

var arachnidQuery = new ArachnidQuery()
var objectId = new ObjectID()

//all arachnids
arachnidRouter.get('/',function(req,res){
  arachnidQuery.all(function(documents){
    res.json(documents)
  })
})

//arachnid by name
arachnidRouter.get('/name',function(req,res){
  arachnidQuery.find(req.params.name,function(documents){
    res.json(documents)
  })
})

//add an arachnid
arachnidRouter.post('/',function(req,res){
  var newArachnid = {
    name: req.body.name,
    order: req.body.order
    }
  })

module.exports = arachnidRouter