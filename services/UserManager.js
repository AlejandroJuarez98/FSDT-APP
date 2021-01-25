'use strict'

const fs = require('fs')
const path = require('path')
const Email = require('../utils/email')
const sequelize = require('sequelize')
const authentication = require('../auth/')
const config = require('../config/config.json')
const UserRepository = require('../repositories/UserRepository')

class UserManager {
	static signIn (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.signIn (body)
					.catch ((error) => {
						throw error
					})

				let object = { userId: result.id, number: 14, value: 'days' }
				let appToken = authentication.createToken(object)
				result['_token'] = appToken

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static getAllUser () {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.getAllUser ()
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	
	static getUserByObject (user) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.getUserByObject (user)
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	
	static getUserById (userId) {
		return new Promise (async (resolve, reject) => {
			try {
				let user = { id: userId }
				let result = await UserRepository.getUserByObject (user)
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static save (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.save (body)
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static updateUser (body, userId) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.updateUser (body, userId)
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static deleteUser (userId) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.deleteUser (userId)
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static sendResetPasswordRequest (body) {
		return new Promise (async (resolve, reject) => {
			try{
				let result = await UserManager.getUserByObject(body)
					.catch ((error) => {
						throw error
					})

				let userEmail = body.email
				let object = { userId: result.data.data.dataValues.id, number: 15, value: 'minutes' }

				let link = 'http://localhost:2000/reset-password-request/' + authentication.createToken(object) + '#' + object.userId

				let html = fs.readFileSync(path.join(__dirname, '..', 'views', 'mail-template.html'))
				html = '' + html.toString('utf8')

				html = html.replace('(%username%)', userEmail)
				html = html.replace('(%link%)', link)

				let eobject = {
					to: body.email,
					subject: "Recuperación de contraseña",
					html: html
				}

				if (result.data.data.dataValues.id != undefined) {
					let info = await Email(eobject)
						.catch((error) => {
							throw error
						})

					resolve ({
						info: info,
						success: true,
						message: 'The email has been sent successfully'
					})
				} else {
					reject ({
						success: false,
						message: 'An error has occurred while sending email'
					})
				}
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static resetPassword (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await UserRepository.resetPassword (body)
					.catch ((error) => {
						throw error
					})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}
}

module.exports = UserManager