import Column from "../models/columnModel.js";
import Project from "../models/projectModel.js";

class ColumnControllers {

    async editColumn(req, res, next) {
        try {
            const project = await Project.findById(req.body.projectId);
            const updatedColumn = await Column.findOneAndUpdate({_id:project.columnId},{columns:req.body.columns},{new:true});
            res.status(200).json(updatedColumn);
        } catch (e) {
            next(e);
        }
    }
    async addNewTask(req, res, next) {
        try {
            const updatedColumn = await Column.findOneAndUpdate({_id:req.body._id},{$push:{'columns.column-1.taskIds':req.body.newTaskId}},{new:true});
            res.status(200).json(updatedColumn);
        } catch (e) {
            next(e);
        }
    }
}

export default new ColumnControllers()