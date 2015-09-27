var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var crypto = require('crypto');

module.exports = {

	signup : function signup(db, data, callback){
		db.collection('user').insertOne({
			'username' : data.username,
			'passowrd' : crypto.createHash('md5').update(data.password).digest("hex"),
			'token' : data.token
		}, function(err, result){
			assert.equal(null, err);
			callback(result);
		});
	},

	login : function login(){

	},

	add_vasty : function add_vasty(db, data, callback){
		var cursor = db.collection('user').find({"_id": ObjectId(data.user_id)});
		cursor.each(function(err, result){
			assert.equal(null, err);
			if(result != null){
				if(result.hasOwnProperty('vasty')){
					var tmp_vasty = {
						data : []
					};

					for(var i = 0; i <  result.vasty.length; i++){
						tmp_vasty.data.push(result.vasty[i]);
					}

					var new_vasty = {};
					new_vasty['vasty_name'] = data.vasty_name;
					new_vasty['vasty_code'] = data.vasty_code;
					new_vasty['flower_type'] = data.flower_type;

					tmp_vasty.data.push(new_vasty);
					result.vasty = tmp_vasty.data;

					db.collection('user').update(
						{"_id" : ObjectId(data.user_id)},
						result
					);

				}else{
					var new_vasty = {};
					new_vasty['vasty_name'] = data.vasty_name;
					new_vasty['vasty_code'] = data.vasty_code;
					new_vasty['flower_type'] = data.flower_type;
					result.vasty = [new_vasty];

					db.collection('user').update(
						{"_id" : ObjectId(data.user_id)},
						result
					);
				}

				callback(true);

			}
		});
	},

	get_vasty : function get_vasty(db, data, callback){
		var cursor = db.collection('user').find({"_id": ObjectId(data.user_id)});
		cursor.each(function(err, result){
			assert.equal(null, err);
			if(result != null){
				var tmp_vasty = {
						data : []
				};

				if(result.hasOwnProperty('vasty')){
					for(var i = 0; i <  result.vasty.length; i++){
						tmp_vasty.data.push(result.vasty[i]);
					}
				}
				callback(tmp_vasty.data);
			}
		});
	},

	get_flower : function get_flower(db, callback){
		var flower = {
			data : []
		}

		var cursor = db.collection('flower').find().toArray(function(err, items){
			callback(items);
		});
	},

	get_specific_flower : function get_specific_flower(db, data, callback){
		var cursor = db.collection('flower').find({ "_id" : ObjectId(data.flower_type)}).toArray(function(err, result){
			callback(result);
		});
	},

	get_all_user : function get_all_user(db, callback){
		var cursor = db.collection('user').find().toArray(function(err, result){
			callback(result);
		});
	}
}