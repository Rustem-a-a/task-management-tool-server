import Task from "../models/taskModel.js";
import path from 'path';
import fs from 'fs';
import ApiError from "../exceptions/apiError.js";

const downloadDirectory = path.join('src/uploads/');

class LoadingController {

    async uploadFile(req, res, next) {
        try {
            const file = req.file;
            const attachmentsDate = Date.now();
            fs.rename('src/uploads/'+file.filename, 'src/uploads/'+attachmentsDate+'_'+file.filename, (err) => {
                if (err) {
                    throw ApiError.BadRequest('Ошибка при сохранении файла.');
                }})
            const task = await Task.findOneAndUpdate({_id: req.body.taskId}, {$push: {attachments: attachmentsDate+'_'+file.filename}},{new:true})
            res.status(201).json(task);
        } catch (e) {
            next(e);

        }
   }

    async downloadFile(req, res, next) {
        try {
            const filename = req.params.filename;
            const filePath = path.join(downloadDirectory, filename);
            const fileExists = fs.existsSync(filePath);
            if (!fileExists) {
                throw ApiError.BadRequest('Файл не найден');
            }
            res.download(filePath);
        } catch (e) {
            next(e);
        }
    };

    async deleteFile(req, res, next) {
        try {
            const {taskId,filename} = req.params;
            const task =await Task.findOneAndUpdate({_id:taskId}, {$pull: {attachments:filename}},{new:true})
             await Task.findById(taskId)
            const filePath = path.join(downloadDirectory, filename);
                       const fileExists = fs.existsSync(filePath);
            if (!fileExists) {
                throw ApiError.BadRequest('Файл не найден');
            }
            fs.unlinkSync(filePath);
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }
    };
}

export default new LoadingController()