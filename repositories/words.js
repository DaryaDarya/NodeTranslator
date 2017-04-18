var getDB = require("./db");
const _ = require("lodash");
const mongodb = require('mongodb');

var getCollection = function(){
	return getDB()
		.then(db =>{
			return db.collection("words");	
		})
}
exports.getAll = function getAll(){
	return getCollection()
		.then(collection => collection.find().toArray());
}
exports.save = function save(wordObj){
	return getCollection()
		.then(collection => collection.save(wordObj));
}

exports.getByWords = function getByWords(csWord, ruWord){
	return getCollection()
		.then(collection => collection.find({cs_word:csWord, ru_word:ruWord}).toArray());
}

exports.destroy = function destroy(id){
	return getCollection()
		.then(collection => collection.deleteOne({id: id}));
}

exports.getUnstudied = function getUnstudied(count){
	return getCollection()
		.then(collection => collection.find().sort().limit(count).toArray());
}

exports.updateRate = function updateRate(rateList){
	var mappedIds = [];
	_.forEach(rateList, (value) => mappedIds.push(new mongodb.ObjectID(value)));
	return getCollection()
		.then(collection => collection.updateMany({_id: {$in: mappedIds}}, {$inc:{rate:1}}));
}