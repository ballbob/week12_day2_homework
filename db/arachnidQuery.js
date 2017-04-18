var MongoClient = require('mongodb').MongoClient

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

}

module.exports = ArachnidQuery