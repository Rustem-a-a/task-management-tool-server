import TaskService from "../service/TaskService.js";
import Task from "../models/taskModel.js";

class TaskControllers {

    async createTask(req, res, next) {
        try {
            console.log(req.body)
            const task = await TaskService.createTask(req.body)
            return res.status(200).json(task);
        } catch (e) {
            next(e)
        }
    }
    async editTask(req, res, next) {
        try {
            const updatedTask = await TaskService.edit(req.body)
            res.status(200).json(updatedTask)
        } catch (e) {
            next(e)
        }
    }
    async deleteTask(req, res, next) {
        try {
            const id = req.params.id
            const deletedTask = await TaskService.delete(id)
            res.status(200).json(deletedTask)
        } catch (e) {
            next(e)
        }
    }
    async getTasks(req, res, next) {
        try {
            const user = req.body.user.id
            const tasks = await Task.find({author:user,title: 'Name'})
            res.status(200).json(tasks)
        } catch (e) {
            next(e)
        }
    }
}

export default new TaskControllers()