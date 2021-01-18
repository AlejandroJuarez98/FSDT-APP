'use strict'

const express = require('express')
const router = express.Router()

const Auth = require('../auth/')
const uploads = require('../utils/uploads')
const Controllers = require('../controllers')

/** User **/
router.post('/user/sign-in', Controllers.users.signIn)
router.post('/user/sign-up', Controllers.users.signUp)
router.post('/user/reset-password', Controllers.users.resetPassword)
router.post('/user/send-reset-password-request', Controllers.users.sendResetPasswordRequest)

router.post('/user/save', Auth.ensureAuthenticated, Controllers.users.save)
router.get('/user/get-users', Auth.ensureAuthenticated, Controllers.users.getAllUser)
router.put('/user/update-user/:userId', Auth.ensureAuthenticated, Controllers.users.updateUser)
router.delete('/user/delete-user/:userId', Auth.ensureAuthenticated, Controllers.users.deleteUser)
router.get('/user/get-user-by-id/:userId', Auth.ensureAuthenticated, Controllers.users.getUserByObject)
/** Product **/
router.get('/products/get-product/:id', Auth.ensureAuthenticated, Controllers.products.getProductById)
router.post('/products/save', Auth.ensureAuthenticated, uploads.single('avatar'), Controllers.products.save)
router.put('/products/update-product/:id', Auth.ensureAuthenticated, uploads.single('avatar'), Controllers.products.update)
router.post('/products/get-products/', Auth.ensureAuthenticated, Controllers.products.getProductByObject)
router.post('/products/get-products-by-filter/', Auth.ensureAuthenticated, Controllers.products.getProductByFilter)
router.get('/products/get-products-by-id/:productId', Auth.ensureAuthenticated, Controllers.products.getProductById)

router.delete('/products/delete-product/:id', Auth.ensureAuthenticated, Controllers.products.deleteProduct)

module.exports = router