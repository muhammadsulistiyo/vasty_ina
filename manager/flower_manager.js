var db_helper = require('../helper/database_helper');
var uri_helper = require('../helper/uri_helper');

module.exports = {
	get_flower : function get_flower(db, callback){
		db_helper.get_flower(db, function(result){
			callback(result);
		});
	},

	get_specific_flower : function get_specific_flower(db, data, callback){
		db_helper.get_specific_flower(db, data, function(result){
			callback(result);
		});
	}
}