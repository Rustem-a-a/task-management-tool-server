import TaskService from "../service/TaskService.js";
import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";

class TaskControllers {
    async createTask(req, res, next) {
        try {
            const task = await TaskService.createTask(req.body);
            return res.status(200).json(task);
        } catch (e) {
            next(e)
        }
    }
    async editTask(req, res, next) {
        try {
            const updatedTask = await TaskService.edit(req.body);
            res.status(200).json(updatedTask);
        } catch (e) {
            next(e);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const {projectId, taskId,parentId} = req.params;
            const deletedTask = await TaskService.delete({projectId, taskId,parentId});
            res.status(200).json(deletedTask);
        } catch (e) {
            next(e);
        }
    }
    async getProjectTasks(req, res, next) {
        try {
            const {projectId} = req.params;
            const query = await Project.findById(projectId).select(['columnId','tasks']).populate(['columnId','tasks']);
            const tasksResponse = query.tasks.reduce((ac,v)=>{
                ac[v._id] = v;
                return ac;
            },{})
            res.status(200).json({
                columns:query.columnId.columns,
                tasks:tasksResponse
            })
        } catch (e) {
            next(e);
        }
    }

    async getSubtasks (req,res,next){
        try{
            const {taskId} = req.params;
            const subtasks = await Task.findById(taskId).select('-_id subtasks').populate('subtasks');
            res.status(200).json(subtasks);
        }catch (e) {
            next(e);
        }
    }
}

export default new TaskControllers()