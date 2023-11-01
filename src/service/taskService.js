import Task from "../models/taskModel.js";
import ApiError from "../exceptions/apiError.js";
import Project from "../models/projectModel.js";
import Column from "../models/columnModel.js";


class TaskService{
async createTask (task){
    console.log('START')
    if(!task.parentId){
        console.log(11111111111)
    const possibleTask = await Project
        .findById(task.projectId)
        .select('tasks -_id ')
        .populate({path: 'tasks', select:'-_id title'})
        if (possibleTask.tasks.find(v=>v.title===task.title)) {
        throw ApiError.BadRequest( `Task with name ${task.title} has existed`);
        }
        const newTask = await Task.create({...task,author:task.user.id})
        const project = await Project.findOneAndUpdate({_id: task.projectId}, { $push: { tasks: newTask._id }},{new:true})
        const columns = await Column.findOneAndUpdate({_id:project.columnId},{$push:{'columns.column-1.taskIds':newTask._id}},{new:true})
        return ({newTask,columns})
    }

    if(task.parentId){
        console.log(task)
        const possibleTask = await Task
            .findById(task.parentId)
            .select('subtasks -_id ')
            .populate({path: 'subtasks', select:'-_id title'})
        console.log(possibleTask)
        if (possibleTask.subtasks.find(v=>v.title===task.title)) {
            throw ApiError.BadRequest( `Task with name ${task.title} has existed`);
        }
        const newTask = await Task.create({...task,author:task.user.id,child:true})
        const updatedTask = await Task.findOneAndUpdate({ _id: task.parentId}, { $push: { subtasks: newTask._id } },{new:true})
        // const subtasks = await Task.findById(task.parentId).select('-_id subtasks').populate('subtasks')
        // console.log(subtasks)
        // return (subtasks)
        console.log(newTask)

        const project = await Project.findOneAndUpdate({_id: task.projectId}, { $push: { tasks: newTask._id }},{new:true})
        const columns = await Column.findOne({_id:project.columnId})

        return ({newTask,updatedTask,columns})
    }



}

async edit (task){
    const possibleTask = await Task.findById(task._id);
    if (!possibleTask) {
        throw ApiError.BadRequest( `Task with id ${task._id} not found`);
    }
    const updatedTask = await Task.findByIdAndUpdate(task._id,task,{new:true})
    return updatedTask
}
    async delete ({projectId, taskId,parentId}) {
        const task = await Task.findById(taskId);
        if (!task) {
            throw ApiError.BadRequest( `Task with id ${taskId} not found`);
        }
        const deletedTask = await task.deleteOne()
        if (parentId && parentId!=='undefined'){
            await Task.findOneAndUpdate(
                { _id: parentId },
                { $pull: { subtasks: taskId } },
                { new: true })
        }
        await Project.findOneAndUpdate(
            { _id: projectId },
            { $pull: { tasks: taskId } },
            { new: true })
        return deletedTask
    }
}
export default new TaskService()