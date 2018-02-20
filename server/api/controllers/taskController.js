const taskModel = require("../models/task-model.js");



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

			console.log("new Taske was created by" + newTask.taskCreator);
		});

}

//review all task scheduales

//get all task
exports.getTasks = function(){
taskModel.find({}, function(err, docs){
	if(err) console.log(err)

	res.json(docs);
})
}

//delete task


//check list of task schedule and store next three upcoming task
