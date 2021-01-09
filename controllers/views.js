'use strict'

const path = require('path')

class Views {
	constructor () {}

	home (request, response, next) {
		response.render(path.join(__dirname, '..', 'views', 'home.html'))
	}
}

module.exports = new Views()