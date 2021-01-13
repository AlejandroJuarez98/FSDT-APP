'use strict'

const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
	encrypt: function (text) {
		let salt = bcrypt.genSaltSync(saltRounds)
		return bcrypt.hashSync(text, salt)
	},

	compare: function (text, hash) {
		if (!bcrypt.compareSync(text, hash)) {
			return false
		} else {
			return true
		}
	}
} 