'use strict'

const path = require('path')

class Views {
	constructor () {}

	home (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'home.html'))
	}

	dashboard (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'home.html'))
	}

	resetPassword (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'reset-password.html'))
	}

	notFound (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', '404.html'))
	}
}

module.exports = new Views()