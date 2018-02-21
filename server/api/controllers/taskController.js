const taskModel = require("../models/task-model.js");
const nodemailer = require("nodemailer");
const emailCtrl = require("./emailController.js");




//setInterval(function(){
//  emailCtrl.sendEmail(dataa)
//}, 1500 * 3); 


//create task
exports.createTask = function(taskObject){
	var newTask = new taskModel();
		newTask.title = taskObject.title;
		newTask.taskInstructions = taskObject.instructions;
		newTask.schedule = taskObject.schedule;
		newTask.status = taskObject.status;
		newTask.taskCreator = taskObject.creator;
		newTask.contractor = taskObject.contractor;

		newTask.save(function(err, data){
			if(err) console.log(err)

			res.json(data);
			console.log("new Taske was created by" + newTask.taskCreator);
		});

}

//review all task scheduales

//get all task
exports.getTasks = function(){
taskModel.find({}, function(err, docs){
	if(err) console.log(err)

	return docs
})
};

//delete task


//check list of task schedule and store next three upcoming task
exports.emailLatestTodos = function(){
	const todos = [];
	const email = "newmanp15@gmail.com";

	const query = taskModel.find({});

	//limit query return amount
	query.limit(4);

	query.exec(function(err, task){
		todos = task;
	});

	const emailData = {
	email: email,
	password: 'Florida4545',
	msg: todos,
	subject: 'latest todos'
};
emailCtrl.sendEmail(emailData);
}