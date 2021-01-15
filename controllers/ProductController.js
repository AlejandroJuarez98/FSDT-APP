'use strict'

const path = require('path')
const ProductManager = require('../services/ProductManager')

class ProductController {
	constructor () {}

	getProductByObject (request, response, next) {
		ProductManager.getProductByObject (request.body)
			.then((result) =>  {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	getProductById (request, response, next) {
		ProductManager.getProductById (request.params.productId)
			.then((result) =>  {
				response
					.status(200)
					.json(result)
			})
			.catch((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	save (request, response, next) {
		let file = (request.file != undefined) ? request.file : null
		
		ProductManager.save (request.body, file)
			.then ((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch ((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	update (request, response, next) {
		let file = (request.file != undefined) ? request.file : null

		ProductManager.update (request.body, request.params.id, file)
			.then ((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch ((error) => {
				response
					.status(500)
					.json(error)
			})
	}

	deleteProduct (request, response, next) {
		ProductManager.deleteProduct (request.params.id)
			.then((result) => {
				response
					.status(200)
					.json(result)
			})
			.catch ((error) => {
				response
					.status(500)
					.json(error)
			})
	}
}

module.exports = new ProductController()