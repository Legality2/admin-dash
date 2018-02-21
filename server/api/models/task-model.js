const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//model to create and keep track of created and daily task on required intervels

const taskModel = new Schema({
	title: {type: String},
	taskInstructions: {type: String},
	schedule: String,
	created_date: {type:Date, default: Date.now},
	status: {type: String},
	taskCreator: {type: String},
	contractor: {type: String}
});

module.export = mongoose.model('taskModel', taskModel);