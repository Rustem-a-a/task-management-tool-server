import Task from "../models/taskModel.js";
import ApiError from "../exceptions/apiError.js";


class TaskService{
    async createTask (task){
        const possibleTask = await Task.findOne({title:task.title});
        if (possibleTask) {
            throw ApiError.BadRequest( `Project with name ${task.title} has existed`);
        }
        const newTask = await Task.create({...task,author:task.user.id})
        return newTask
    }
    async edit (task){
        const possibleTask = await Task.findById(task.id);
        if (!possibleTask) {
            throw ApiError.BadRequest( `Project with id ${task.id} not found`);
        }
        console.log(333333333333)
        const updatedTask = await Task.findByIdAndUpdate(task.id,task,{new:true})
        return updatedTask
    }
    async delete (id) {
        const task = await Task.findById(id);
        if (!task) {
            throw ApiError.BadRequest( `Project with id ${id} not found`);
        }
        const deletedTask = await task.deleteOne()
        return deletedTask
    }
}

export default new TaskService()