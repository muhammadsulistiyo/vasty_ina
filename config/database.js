var mongo_client = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/vasty';

module.exports = {
	connect : function connect(callback){
		mongo_client.connect(url, function(err, db){
			assert.equal(null, err);
			
			if(err)	{
				console.log('unable to connect to mongo server, Error' + err);
				callback(false);
			}else{
				console.log('mongodb : connection establised');
				callback(db);
			}
		});
	}
}

