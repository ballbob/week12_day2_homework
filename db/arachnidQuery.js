var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var ArachnidQuery = function(){
  this.url = "mongodb://localhost:27017/arachnida"
}

ArachnidQuery.prototype = {
  all: function(functionWhenFinished){
    MongoClient.connect(this.url,function(error,db){
      if(db){
        var bugs = db.collection('arachnida')

        bugs.find().toArray(function(error,documents){
          functionWhenFinished(documents)
        })
      }
    })
  },

  find: function(searchID,functionWhenFinished){
    MongoClient.connect(this.url,function(error,db){
      if(db){
        var bugs = db.collection('arachnida')

        foundBug = bugs.find({name: searchID})
        
        foundBug.toArray(function(error,doc){
          functionWhenFinished(doc)
        })
      }
    })
  },

  add: function(arachnidToAdd,functionWhenFinished){
    MongoClient.connect(this.url,function(error,db){
      if(db){
        var bugs = db.collection('arachnida')
        bugs.insert(arachnidToAdd)

        bugs.find().toArray(function(err,docs){
          functionWhenFinished(docs)
        })
      }
    })
  }

}

module.exports = ArachnidQuery