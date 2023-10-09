import Column from "../models/columnModel.js";

class ColumnControllers {

    async editTask(req, res, next) {
        try {
            console.log(req.body)
            const updatedTask = await Column.findOneAndUpdate({_id:req.body._id},{columns:req.body.columns},{new:true})
            res.status(200).json(updatedTask)
        } catch (e) {
            next(e)
        }
    }
}

export default new ColumnControllers()