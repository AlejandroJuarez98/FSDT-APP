 'use strict'

const moment = require('moment')
const jwt = require('jwt-simple')
const config = require('./config')

module.ensureAuthenticated  = function (request, response, next) {
	if (!request.headers.authorization) {
		return response
			.status(403)
			.send({ message: "La petición no posee cabecera de autenticación", code: 403 })
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

