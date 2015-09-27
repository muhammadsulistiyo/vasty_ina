var user_manager = require('./user_manager');
var vasty_manager = require('./vasty_manager');
var flower_manager = require('./flower_manager');
var uri_helper = require('../helper/uri_helper');

module.exports = {
	process_request : function process_request(db, req, callback){
    	if(req.type === uri_helper.signup){
    		user_manager.signup(db, req, function(res){
    			res.group = "user";
    			callback(res);
    		});
		}if(req.type === uri_helper.user_connect){
    		user_manager.connect(db, req, function(res){
    			res.group = "user";
    			callback(res);
    		});
		}else if(req.type === uri_helper.add_pot){
			vasty_manager.add_user_vasty(db, req, function(res){
				res.group = "pot";
				callback(res);
			});
		}else if(req.type === uri_helper.get_my_pot){req
			vasty_manager.get_vasty(db, req, function(res){
				res.group = "pot";
				callback(res);
			});
		}else if(req.type === uri_helper.get_flower){
			flower_manager.get_flower(db, req, function(res){
				callback(res);
			});
		}else if(req.type === uri_helper.vasty_connect){
			vasty_manager.vasty_connect(db, req, function(res){
				callback(res);
			});
		}
	}
}