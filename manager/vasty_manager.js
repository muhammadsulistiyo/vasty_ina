var db_helper = require('../helper/database_helper');
var uri_helper = require('../helper/uri_helper');
var list_vasty = {};

module.exports = {
	vasty_connect : function vasty_connect(db, data, callback){
		var tmp_user_online;
		require('./user_manager').user_online(function (user_active){
			require('./user_manager').get_all_user(db, function(list_user){
							
				var is_exist = false;
				for(var i = 0; i < list_user.length; i++){
					var tmp_user = list_user[i];

					if(list_user[i].hasOwnProperty('vasty')){
						for(var j = 0; j < list_user[i].vasty.length; j++){
							if(list_user[i].vasty[j].vasty_code+"" === data.vasty_code+""){
								is_exist = true;
								require('./flower_manager').get_specific_flower(db, list_user[i].vasty[j], function(result){
									var tmp = {};
									tmp['status'] = true;
									tmp['flower'] = result[0];

									if(user_active.hasOwnProperty(tmp_user._id)){
										var trigger = {};

										trigger[uri_helper.type] = uri_helper.trigger_vasty_connected;
										trigger['vasty_code'] = data.vasty_code;
										trigger[uri_helper.status] = uri_helper.success;
										trigger['group'] = "pot";

										user_active[tmp_user._id].socket.write(JSON.stringify(trigger));
									}

									callback(tmp);
								});
								break;
							}
						}
					}
				}

				if(!is_exist){
					var tmp = {};
					tmp['status'] = false;

					callback(tmp)
				}
			});
		});

		list_vasty[data.vasty_code]={
			"vasty_code" : data.vasty_code+"",
			"socket" : data.socket
		};
	},

	remove_vasty : function remove_active_vasty(vasty_code){
		//list_vasty.vasty_code.splice(list_vasty.vasty_code.indexOf(vasty_code), 1);
	},

	add_user_vasty : function add_user_vasty(db, data, callback){
		db_helper.add_vasty(db, data, function(res){
			var response = {};
			if(res){
				response[uri_helper.type] = uri_helper.response_add_pot;
				response[uri_helper.status] = uri_helper.success;

				if(list_vasty.hasOwnProperty(data.vasty_code)){
					list_vasty[data.vasty_code].socket.write('activated');
				}
			}else{
				response[uri_helper.type] = uri_helper.response_add_pot;
				response[uri_helper.status] = uri_helper.failed;
			}
			callback(response);
		});
	},

	get_vasty : function get_vasty(db, data, callback){
		db_helper.get_vasty(db, data, function(res){

			for(var i = 0; i < res.length; i++){
				// console.log("data = "+res[i].vasty_code+","+list_vasty.vasty_code.indexOf(res[i].vasty_code));
				// if(list_vasty.vasty_code.indexOf(res[i].vasty_code+"") >= 0){
				if(list_vasty.hasOwnProperty(res[i].vasty_code)){
					res[i].status = "online";
				}else{
					res[i].status = "offline";
				}
			}

			db_helper.get_flower(db, function(result){
				callback({"type":"response_get_my_pot", "status" : "success", "data" : res, "data_flower" : result});
			});
		});
	}

}
