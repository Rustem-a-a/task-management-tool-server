import Router from 'express'
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";
import LoadingController from "../controllers/loadingController.js";

const router = new Router();
const storage = multer.diskStorage({
    destination: 'src/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post('/upload',upload.single('file'),authMiddleware,LoadingController.uploadFile)
router.get('/download/:filename',authMiddleware,LoadingController.downloadFile)
router.delete('/deleteupload/:taskId/:filename',authMiddleware,LoadingController.deleteFile)

export default router