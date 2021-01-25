'use strict'

const path = require('path')
const UserManager = require('../services/UserManager')

class UserController {
	constructor () {}

	signIn (request, response, next) {
		UserManager.signIn (request.body)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	signUp (request, response, next) {
		UserManager.save (request.body)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	getAllUser (request, response, next) {
		UserManager.getAllUser ()
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	getUserById (request, response, next) {
		UserManager.getUserById (request.params.userId)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	getUserByObject (request, response, next) {
		UserManager.getUserByObject (request.body)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}
	
	save (request, response, next) {
		UserManager.save (request.body)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	updateUser (request, response, next) {
		UserManager.updateUser (request.body, request.params.userId)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	deleteUser (request, response, next) {
		UserManager.deleteUser (request.params.userId)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	sendResetPasswordRequest (request, response, next) {
		UserManager.sendResetPasswordRequest (request.body)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	resetPassword (request, response, next) {
		UserManager.resetPassword (request.body)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}
}

module.exports = new UserController()