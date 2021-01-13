'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('./config')

function createToken (object) {
	const payload =  {
		sub: object.userId,
		iat: moment().unix(),
		exp: moment().add(object.number, object.value).unix()
	}

	return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken

