/**web-qr-generator
 * TAV Medical - I.T
 * https://tavmedical.com
 * https://github.com/liorsh69/web-qr-generator
 * Feel free to use or modify with credit.
 */
const winston = require('winston') // log to file
const express = require('express')
const app = express()
const QRCode = require('qrcode')
const PORT = process.env.PORT || 8080

// log to file
const logger = initLogger()

//
app.get('/', function(req, res) {
	logger.info('-- QR Init --')

	// get req params
	const { size = 150, data } = req.query

	// set QR options
	const qrOptions = {
		errorCorrectionLevel: 'H',
		type: 'image/jpeg',
		rendererOpts: {
			quality: 1,
		},
		width: size,
	}

	// check if data exists
	if (!data) {
		const error = 'ERROR - Parameter Required: data'
		logger.error(error)
		res.send(error)
		return
	}

	logger.info(`QR Size: ${size}`)
	logger.info(`QR Data: ${data}`)

	QRCode.toDataURL(data, qrOptions, function(err, base64) {
		if (err) {
			const error = `ERROR - QRCode: ${err}`
			logger.error(error)
			res.send(error)
			return
		}

		var base64Data = base64.replace(/^data:image\/png;base64,/, '')

		var img = Buffer.from(base64Data, 'base64')

		logger.info('-- Done --')
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': img.length,
		})
		res.end(img)
	})
})

app.listen(PORT, error => {
	logger.info(`App Is Running: http://127.0.0.1:${PORT}`)
})

// log to file
function initLogger() {
	const jsonTimestampFormat = winston.format.printf(
		({ level, message, timestamp }) => {
			return `${timestamp} [${level}]: ${message}`
		}
	)
	return winston.createLogger({
		format: winston.format.combine(
			winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
			jsonTimestampFormat
		),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: 'console.log',
			}),
		],
	})
}
