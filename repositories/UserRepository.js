'use strict'

const Auth = require('../auth/')
const User = require('../models').USERS
const Cipher = require('../utils/cipher')

class UserRepository {
	static signIn (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let userObject = await User.findOne ({
					attributes: [ 'id', 'fullname', 'email', 'password', 'birthdate', 'state' ],
					where: { email: body.email }
				})

				let access = Cipher.compare (body.password, userObject.password)
				delete userObject.password

				if (access && userObject != null) {
					resolve ({
						success: true,
						result: userObject
					})
				} else {
					reject ({
						success: false,
						result: null
					})
				}
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static getAllUser () {
		return new Promise (async (resolve, reject) => {
			try {
				let users = await User.findAll ({
					attributes: [ 'id', 'fullname', 'email', 'password', 'state', 'birthdate' ]
				}).catch ((error) => {
					throw error
				})

				resolve ({
					data: users,
					success: false
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static getUserByObject (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let user = await User.findOne ({
					attributes: [ 'id', 'fullname', 'email', 'password', 'state', 'birthdate' ],
					where: body
				}).catch ((error) => {
					throw error
				})

				resolve ({
					success: true,
					data: user
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static save (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let password = Cipher.encrypt(body.password)

				let newUser = await User.create ({
					fullname: body.fullname,
					email: body.email,
					password: password,
					state: body.state,
					birthdate: body.birthdate
				}).catch((error) => {
					throw error
				})

				resolve ({
					success: true,
					data: newUser
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static updateUser (body, userId) {
		return new Promise (async (resolve, reject) => {
			try {
				let result  = await User.update ({
					fullname: body.fullname,
					email: body.email,
					password: body.password,
					state: body.state,
					birthdate: body.birthdate
				}, {
					where: { id: userId }
				}).catch ((error) => {
					throw error
				})
					
				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static deleteUser (userId) {
		return new Promise (async (resolve, reject) => {
			try {
				let deletedUser = await User.destroy ({
					where: {
						id: userId
					}
				}).catch((error) => {
					throw error
				})

				resolve ({
					success: true,
					data: deletedUser
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static resetPassword (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let password = Cipher.encrypt(body.password)
				let update = await User.update ({
					password: password
				}, {
					where: { id: body.userId }
				})

				resolve ({
					success: true,
					data: update
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

module.exports = UserRepository