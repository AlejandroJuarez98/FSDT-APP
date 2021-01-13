'use strict'

const path = require('path')
const sequelize = require('sequelize')
const ProductRepository = require('../repositories/ProductRepository')

class ProductManager {
	constructor () {}

	static getProductByObject (body) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await ProductRepository.getProductByObject (body)
					.catch ((error) => {
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

	static save (body, file) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await ProductRepository.save (body, file)
					.catch((error) => {
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

	static update (body, productId, file) {
		return new Promise (async (resolve, reject) => {
			try {
				let result = await ProductRepository.update (body, productId,  file)
					.catch((result) => {
						throw result
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
				let result = await ProductRepository.deleteProduct (productId)
					.catch ((error) => {
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
}

module.exports = ProductManager