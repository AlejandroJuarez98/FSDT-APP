'use strict'

const express = require('express'),
	  router = express.Router(),
	  Auth = require('../auth/'),
	  Controller = require('../controllers')


router.get('/', Controller.views.home)
router.post('/validate-token', Auth.ensureAuthenticated)
router.get('/reset-password-request/:link', Auth.ensureLink, Controller.views.changePassword)

router.get('/reset-password', Controller.views.resetPassword)
router.get('/dashboard', Controller.views.dashboard)
router.get('/products', Controller.views.products)
router.get('/users', Controller.views.users)

router.get('/users/save', Controller.views.userSave)
router.get('/products/save', Controller.views.productSave)

router.get('*', Controller.views.notFound)

module.exports = router