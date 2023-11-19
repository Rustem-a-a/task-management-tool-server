import Task from "../models/taskModel.js";
import ApiError from "../exceptions/apiError.js";
import Project from "../models/projectModel.js";
import Column from "../models/columnModel.js";
import Comment from "../models/commentModel.js";


class TaskService{
async createTask (task){
    if(!task.parentId){
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
        const possibleTask = await Task
            .findById(task.parentId)
            .select('subtasks -_id ')
            .populate({path: 'subtasks', select:'-_id title'})
        if (possibleTask.subtasks.find(v=>v.title===task.title)) {
            throw ApiError.BadRequest( `Task with name ${task.title} has existed`);
        }
        const newTask = await Task.create({...task,author:task.user.id,child:true})
        const updatedTask = await Task.findOneAndUpdate({ _id: task.parentId}, { $push: { subtasks: newTask._id } },{new:true})
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
    async delete ({projectId, taskId, parentId}) {
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
        const project = await Project.findOneAndUpdate(
            { _id: projectId },
            { $pull: { tasks: taskId } },
            { new: true })
        const column = await Column.findOne({_id:project.columnId})
        let columnId = ''
        Object.values(column.columns).forEach(value=>{
            value.taskIds.map(v=>{
                if(v===taskId){columnId=value.id}
            })
        })
        const newcolumn = column.columns[columnId].taskIds.filter(v=>v!==taskId)
        column.columns[columnId].taskIds=newcolumn
        await column.save()
        await Comment.deleteMany({taskId:taskId})
        return deletedTask
    }
}
export default new TaskService()