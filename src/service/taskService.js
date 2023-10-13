import Task from "../models/taskModel.js";
import ApiError from "../exceptions/apiError.js";
import Project from "../models/projectModel.js";


class TaskService{
async createTask (task){
    if(!task.parentId){
    const possibleTask = await Project
        .findById(task.projectId)
        .select('tasks -_id ')
        .populate({path: 'tasks', select:'-_id title'})
    if (JSON.stringify(possibleTask).includes(task.title)) {
        throw ApiError.BadRequest( `Project with name ${task.title} has existed`);
    }}
    if(task.parentId){
        const possibleTask = await Task
            .findById(task.parentId)
            .select('subtasks -_id ')
            .populate({path: 'subtasks', select:'-_id title'})
        if (JSON.stringify(possibleTask).includes(task.title)) {
            throw ApiError.BadRequest( `Project with name ${task.title} has existed`);
        }
    }
    const newTask = await Task.create({...task,author:task.user.id})
    await Project.updateOne({_id: task.projectId}, { $push: { tasks: newTask._id } })
    if(task.parentId){
        await Task.updateOne({ _id: task.parentId}, { $push: { subtasks: newTask._id } })
    }

    return newTask
}

async edit (task){
    const possibleTask = await Task.findById(task._id);
    if (!possibleTask) {
        throw ApiError.BadRequest( `Project with id ${task._id} not found`);
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
        if (parentId){
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