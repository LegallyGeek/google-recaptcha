'use strict'

const STATUS_OK = 200

const debug = require('debug')

const rp = require('request-promise')

class GoogleRecaptchaAsync {
  constructor({
    apiUrl,
    secret,
    logger
  }) {
    if (!secret) {
      throw new Error('Missing secret key.')
    }

    this.secret = secret
    this.apiUrl = apiUrl || this.DEFAULT_API_URL
    this.logger = logger || debug('recaptcha')

    this.logger('Google Recaptcha initialized:', this.secret, this.apiUrl)
  }

  verify({
    response,
    remoteIp
  }) {
    return new Promise((resolve, reject) => {
      const secret = this.secret

      if (!response) {
        reject(new Error('Missing response object.'))
      }

      const form = {
        remoteip: remoteIp
        , response
        , secret
      }

      const requestOptions = {
        form
        , json: true
        , url: this.apiUrl
      }

      this.logger('Making POST request to Google:', requestOptions)

      rp.post(requestOptions)
      .then((response) => {
        if (response.statusCode !== this.STATUS_OK) {
          reject(new Error(`Bad response code: ${response.statusCode}`))
        }

        if (!response.body.success) {
          const errorCodes = response.body['error-codes']

          const errorCodesList = Array.isArray(errorCodes) ?
            errorCodes.join(', ') :
            'Unknown'

          reject(new Error(`Failed to verify: ${errorCodesList}`))
        }

        resolve(response.body.success)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}

GoogleRecaptchaAsync.prototype
  .DEFAULT_API_URL = 'https://www.google.com/recaptcha/api/siteverify'

GoogleRecaptchaAsync.prototype
  .STATUS_OK = STATUS_OK

module.exports = GoogleRecaptchaAsync
