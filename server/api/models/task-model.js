const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//model to create and keep track of created and daily task on required intervels

const taskModel = new Schema({
	title: {type: String},
	taskInstructions: {type: String, required: True},
	scheduale:[],
	created_date: {type:Date, default: Date.now},
	status: { type:	
		[{
			type: String,
			enum:['pending', 'ongoing', 'completed']
		}],
			default: ['pending']
		}
	taskCreator: {type: String, required: True},
	contractor: {type: String}
});

module.export = mongoose.model('taskModel', taskModel);