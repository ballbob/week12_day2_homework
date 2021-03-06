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
arachnidRouter.get('/:name',function(req,res){
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

    arachnidQuery.add(newArachnid,function(results){
      res.json(results)
    })
  })

//delete an arachnid
arachnidRouter.delete('/:name',function(req,res){
  arachnidQuery.delete(req.params.name,function(arachnids){
    res.json(arachnids)
  })
})

//update an arachnid
arachnidRouter.put('/:id',function(req,res){
  arachnidQuery.update(req.params.id,req.body,function(arachnids){
    res.json(arachnids)
  })
})


module.exports = arachnidRouter