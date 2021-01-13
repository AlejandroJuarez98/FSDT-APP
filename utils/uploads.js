'use strict'

const path = require('path')
const uuid = require('uuid')
const multer = require('multer')


const storage = multer.diskStorage ({
	destination: (request, file, cb) => {
		cb (null, 'uploads')
	},
	filename: (request, file, cb) => {
		cb (null, uuid.v4() + '-' + Date.now() + path.extname(file.originalname))
	}
})

const fileFilter = (request, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb (null, true)
	} else {
		cb (null, false)
	}
}

const upload = multer ({ storage: storage, fileFilter: fileFilter })
module.exports = upload