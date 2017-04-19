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

//find by a search term
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

//add an arachnid
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
  },

//delete an arachnid
  delete: function(nameToDelete,functionWhenFinished){
   MongoClient.connect(this.url,function(error,db){
     if(db){
       var arachnids = db.collection('arachnida')

       arachnids.remove({name: nameToDelete})

       arachnids.find().toArray(function(err,docs){
         functionWhenFinished(docs)
       })
     }
   })
  },

//update an arachnid's name
  update: function(arachnidId, name, callback){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var arachnids = db.collection('arachnida')
        arachnids.updateOne( { _id: ObjectID(arachnidId) }, { $set: name } )
        arachnids.find().toArray( function(err, docs){
          callback(docs)
        })
      }
    })
  }

//end
}

module.exports = ArachnidQuery