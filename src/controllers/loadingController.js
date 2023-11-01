import Task from "../models/taskModel.js";
import path from 'path';
import fs from 'fs';
import ApiError from "../exceptions/apiError.js";

const downloadDirectory = path.join('src/uploads/');

class LoadingController {

    async uploadFile(req, res, next) {
        try {
            const file = req.file;
            console.log(req.body.user.id)
            console.log(req.body.taskId)
            console.log(file)
            console.log(1111)
            const task = await Task.updateOne({_id: req.body.taskId}, {$push: {attachments: req.body.user.username+'_'+file.filename}})
            console.log(22222222)
            fs.rename('src/uploads/'+file.filename, 'src/uploads/'+req.body.user.username+'_'+file.filename, (err) => {
                if (err) {
                    console.error(err);
                    throw ApiError.BadRequest('Ошибка при сохранении файла.');
                }})
            res.json({filename: file.filename})
        } catch (e) {
            next(e)

        }
   }

    async downloadFile(req, res, next) {
        try {
            const filename = req.params.filename;
            console.log(filename)
            const filePath = path.join(downloadDirectory, filename);
            console.log(filePath)
            const fileExists = fs.existsSync(filePath);
            if (!fileExists) {
                throw ApiError.BadRequest('Файл не найден');
            }
            res.download(filePath);
        } catch (e) {
            next(e)
        }
    };
}

export default new LoadingController()