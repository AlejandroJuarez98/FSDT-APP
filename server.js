'use strict'

const swig = require('swig'),
	  path = require('path'),
	  http = require('http'),
	  logger = require('morgan'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  routes = require('./routes'),
	  config = require('./auth/config'),
	  application = express()

const router = express.Router()

class Server {
	constructor () {
		this.init()
		this.setRoutes()

		this.start()
	}

	init () {
		application.engine('html', swig.renderFile)
		application.set('view engine', 'html')
		application.set('views', path.join(__dirname, 'views'))
		application.set('view cache', false)
		
		swig.setDefaults({ cache: false })

		application.use(logger('dev'))
		application.use(bodyParser.json())
		application.use(bodyParser.urlencoded({ extended: true }))

		application.set('port', process.env.PORT || 2000)
		application.use('/assets/', express.static(path.join(__dirname, 'assets')))
		application.use('/uploads/', express.static(path.join(__dirname, 'uploads')))
	}

	setRoutes () {
		application.use('/', routes.base)
		application.use('/api', routes.api)
		application.use('/', routes.error)
	}

	start () {
		http.createServer(application).listen(application.get('port'), () => {
			console.log(`Express server listening on port: ${ application.get('port') }`)
		})
	}
}

new Server ()
