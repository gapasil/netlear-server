const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname,"images","avatar"))
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports = multer({storage})