var dbConfig = require("../config").db;
var mysql = require("promise-mysql");

//todo: create once in app.js 
var pool = mysql.createPool(dbConfig)

exports.getAll = function getAll(){
	return pool.query('select * from words');
}

exports.save = function save(wordObj){
	return pool.query('INSERT INTO words SET ?', wordObj);
}

exports.getByWords = function getByWords(csWord, ruWord){
	return pool.query(`select * from words where cs_word='${csWord}' and ru_word='${ruWord}'`);
}

exports.destroy = function destroy(id){
	return pool.query(`delete from words where id='${id}'`);
}