'use strict'

const path = require('path')

class Views {
	constructor () {}

	home (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'home.html'))
	}

	dashboard (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'dashboard.html'))
	}

	products (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'products.html'))
	}

	users (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'users.html'))
	}

	userSave (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'user-save.html'))
	}

	productSave (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'product-save.html'))
	}

	resetPassword (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'reset-password.html'))
	}

	changePassword (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'change-password.html'), { link: request.params.link })
	}

	notFound (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', '404.html'))
	}
}

module.exports = new Views()