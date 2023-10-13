import Task from "../models/taskModel.js";
import path from 'path';
import fs from 'fs';

const downloadDirectory = path.join('src/uploads');
class LoadingController {

    async uploadFile(req, res, next) {
        try {
            const file = req.file;
            res.json({filename: file.filename})
        }catch (e) {
            next(e)
        }

    }

    async downloadFile  (req, res,next) {
        try{
            const filename = req.params.filename;
            console.log(filename)
            const filePath = path.join(downloadDirectory, filename);
            console.log(filePath)
            const fileExists = fs.existsSync(filePath);
            if (!fileExists) {
                return next(new Error( 'Файл не найден'));
            }
            res.download(filePath);
        }catch (e) {
            next(e)
        }
};
}
export default new LoadingController()