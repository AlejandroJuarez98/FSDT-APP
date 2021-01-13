'use strict'

const express = require('express'),
	  router = express.Router(),
	  Auth = require('../auth/'),
	  Controller = require('../controllers')


router.get('/', Controller.views.home)
router.post('/validate-token', Auth.ensureAuthenticated)
router.get('/reset-password-request/:link', Auth.ensureLink, Controller.views.resetPassword)

router.get('/reset-password', Controller.views.resetPassword)
router.get('/dashboard', Controller.views.dashboard)
router.get('/products', Controller.views.dashboard)
router.get('/users', Controller.views.dashboard)
router.get('*', Controller.views.notFound)

module.exports = router