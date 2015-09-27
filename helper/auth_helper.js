var crypto = require('crypto');
var assert = require('assert');

module.exports = {

	validate_token : function validate_token(db, token, callback){
		callback(local_validate_token(db, token, function(){
			db.close();	
		}));
	},

	generate_token : generate_token()

}

function generate_token(){
	var time = new Date().getTime();
	return crypto.createHash('md5').update('v4sty' + time).digest("hex");
}

function local_validate_token(db, token, callback){
	var cursor = db.collection('user').find({'token': token});
	cursor.each(function(err, doc){
		assert.equal(err, null);
		if (doc != null) {
         	
	  	} else {
	       	callback();
	   	}

	});
	return cursor;
}