'use strict'

const express = require('express')
const router = express.Router()

const Auth = require('../auth/')
const uploads = require('../utils/uploads')
const Controllers = require('../controllers')

router.get('*', Controllers.views.notFound)

module.exports = router