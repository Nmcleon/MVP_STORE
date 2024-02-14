import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()
//storage location-server. folder: uploaads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage
})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/ //accerted file types
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimeType)

    if (extName && mimeType) {
        return cb(null, true)
    } else {
        cb('Only images allowed')
    }
}

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    })
})

export default router