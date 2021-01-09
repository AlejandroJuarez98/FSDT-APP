'use strict'

const express = require('express'),
	  router = express.Router(),
	  Controllers = require('../controllers')

router.get('/', Controllers.views.home)

module.exports = router