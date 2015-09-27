var db_helper = require('../helper/database_helper');
var uri_helper = require('../helper/uri_helper');
var auth_helper = require('../helper/auth_helper');

module.exports = {
	signup : function signup(db, data, callback){
		data.token = auth_helper.generate_token;

		db_helper.signup(db, data, function(result){
			var response = {};

			if(result != null){
				response[uri_helper.type] = uri_helper.response_signup;
				response[uri_helper.status] = uri_helper.success;
				response['id'] = result.insertedId;
				response['username'] = data.username;
				response['token'] = data.token;
			}else{
				response[uri_helper.type] = uri_helper.response_signup;
				response[uri_helper.status] = uri_helper.failed;
			}
			
			callback(response);
		});
	},

	get_all_user : function get_all_user(db, callback){
		db_helper.get_all_user(db, function(result){
			callback(result);
		});
	},

	connect : function connect(db, data, callback){
		list_user_online[data.user_id] = {
			"user_id" : data.user_id,
			"socket" : data.socket
		}
		var response = {};
		response[uri_helper.type] = uri_helper.response_user_connect;
		response[uri_helper.status] = uri_helper.success;

		console.log(list_user_online);
		callback(response);
	},

	user_online : function user_online(callback){
		callback(list_user_online);
	}
}

var list_user_online = {};