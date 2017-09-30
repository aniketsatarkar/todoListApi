'use strict';

var mongoose = require('mongoose'); // import mongoose in this file.
var Task = mongoose.model('Tasks'); // load schema model for mongoose.

// get all tasks from database.
exports.list_all_tasks = function(req, res){
    Task.find({}, function(err, task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

// add a new task to the list.
exports.create_a_task = function(req, res){
    var new_task = new Task(req.body);

    new_task.save(function(err, task){ 
        if(err)
            res.send(err);
        res.json(task);
    });
};

// get a task using its task id, which is documents _id.
exports.read_a_task = function(req, res){
    Task.findById(req.params.taskId, function(err, task){
        if(err)
            res.send(err);
        res.json(task)
    });
};

// update a task that already exists using document _id.
exports.update_a_task = function(req, res){
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, {new: true}, function(err, task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

// delete a task from collection using documents _id.
exports.delete_a_task = function(req, res){
    Task.remove({_id: req.params.taskId}, function(err, task){
        if(err)
            res.send(err);
        res.json({ message: 'Task successfully deleted!' });
    });
};