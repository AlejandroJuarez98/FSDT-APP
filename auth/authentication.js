 'use strict'

const path = require('path')
const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('./config')

exports.ensureAuthenticated  = function (request, response, next) {
	if (!request.headers.authorization) {
		return response
			.status(403)
			.render(path.join(__dirname, '..', 'views', '403.html'))
	}

	let token = request.headers.authorization.split(" ")[1]
	let payload = jwt.decode(token, config.SECRET_TOKEN)

	if (payload.exp <= moment().unix()) {
		return response
			.status(401)
			.send({ message: "El token de autenticación ha expirado", code: 401 })
	}

	request.user = payload.sub
	next()
}

exports.ensureLink = function (request, response, next) {
	let token = request.params.link
	token = token.split('#')[0]

	if (!token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
		return response
			.status(500)
			.render(path.join(__dirname, '..', 'views', '403.html'))
	}

	let payload = jwt.decode(token, config.SECRET_TOKEN)
	if (payload.exp <= moment().unix()) {
		return response
			.status(401)
			.render(path.join(__dirname, '..', 'views', '403.html'))
	}

	request.user = payload.sub
	next()
}