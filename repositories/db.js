const MongoClient = require('mongodb').MongoClient;
var dbConfig = require("../config").db;

module.exports = function(){
	return MongoClient.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
		.then( database => {
			return database;
		})
		.catch(function (err) {
			console.log(err);
		})
}	