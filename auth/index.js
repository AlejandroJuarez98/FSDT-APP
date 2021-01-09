'use strict'

module.exports = {
	createToken: require('./createToken'),
	ensureAuthenticated: require('./authentication').ensureAuthenticated
}