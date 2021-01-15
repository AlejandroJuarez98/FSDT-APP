'use strict'

const sequelize = require('sequelize')
const Product = require('../models/').PRODUCTS

class ProductRepository {
	constructor () {}

	static getProductByObject (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let product = await Product.findAll ({
					attributes: [ 'id', 'sku', 'name', 'quantity', 'price', 'description', 'image' ],
					offset: parseInt(body.offset),
					limit: parseInt(body.rowCount), 
					where: body.filter
				}).catch((error) => {
					throw error
				})

				resolve ({
					data: product,
					success: true
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static getProductById (productId) {
		return new Promise (async (resolve, reject) => {
			try {
				let product = await Product.findOne ({
					attributes: [ 'id', 'sku', 'name', 'quantity', 'price', 'description', 'image' ],
					where: { id: productId }
				}).catch((error) => {
					throw error
				})

				resolve ({
					data: product,
					success: true
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static save (body, file) {
		return new Promise (async (resolve, reject) => {
			try {
				if (file == undefined) {
					file = 'http://localhost:2000/uploads/image-not-available.jpg'
				}

				let product = await Product.create ({
					sku: body.sku,
					name: body.name,
					quantity: body.quantity,
					price: body.price,
					description: body.description,
					image: file.filename
				}).catch ((error) => {
					throw error
				}) 

				resolve ({
					success: true,
					data: product
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}

	static update (body, productId, file) {
		return new Promise (async (resolve, reject) => {
			try {
				if (file == undefined) {
					file = 'http://localhost:2000/uploads/image-not-available.jpg'
				}

				let result = await Product.update ({
					sku: body.sku,
					name: body.name,
					quantity: body.quantity,
					price: body.price,
					description: body.description,
					image: file.filename
				}, { 
					where: { id: productId }
				}).catch ((error) => {
					throw error
				})

				resolve ({
					success: true,
					data: result
				})
			} catch (error) {
				reject ({
					success: false,
					error: error
				})
			}
		})
	}

	static deleteProduct (productId) {
		return new Promise (async (resolve, reject) => {
			try {
				let deletedProduct = await Product.destroy ({
					where: { id: productId }
				}).catch((error) => {
					throw error
				})

				resolve({
					success: true,
					result: deletedProduct
				})
			} catch (error) {
				reject ({
					error: error,
					success: false
				})
			}
		})
	}
}

module.exports = ProductRepository