/**
 * @module rooftop
 */

const Joi = require('joi')
const rest = require('rest')
const mime = require('rest/interceptor/mime')
const errorCode = require('rest/interceptor/errorCode')
const defaultRequest = require('rest/interceptor/defaultRequest')
const pathPrefix = require('rest/interceptor/pathPrefix')
const location = require('rest/interceptor/location')

/**
 * @class Rooftop
 * @classdesc This is kind of a fake class because of our proxy hackery, but it
 * behaves like one pretty much
 */
const Rooftop = {
  /**
   * Creates a new instance of the API client
   * @constructor
   * @param {Object} opts - options object
   * @param {String} url - url of your rooftop site
   * @param {String} apiToken - api token for your rooftop site
   * @returns {Object} instance of rooftop client
   */
  new: function (_opts = {}) {
    const opts = validate(_opts)
    let protocol = ''

    if (!opts.url.startsWith('http://') && !opts.url.startsWith('https://')) {
      protocol = opts.url.startsWith('//') ? 'https:' : 'https://'
    }
    const url = `${protocol}${opts.url}/wp-json/wp/v2/`

    const client = rest
      .wrap(mime)
      .wrap(errorCode)
      .wrap(location)
      .wrap(defaultRequest, {
        headers: { 'Api-Token': opts.apiToken }
        // params: { per_page: 999999 }
      }).wrap(pathPrefix, {
        prefix: url
      })

    return new Proxy({
      name: opts.name,
      apiToken: opts.apiToken,
      contentType: (name) => {
        return {
          get: (opts) => {
            return client(Object.assign({ path: name }, { params: opts }))
              .then((r) => r.entity)
          }
        }
      }
    }, proxyHandler)
  }
}

/**
 * Proxies `instance.foo` to `instance.contentType('foo')`
 * @constant
 */
const proxyHandler = {
  get: (target, name) => { return target.contentType(name) }
}

/**
 * Validates the constructor's options
 * @param {Object} opts - options object
 * @param {String} url - url of your rooftop site
 * @param {String} apiToken - api token for your rooftop site
 * @returns {Object} validated options object
 */
function validate (opts) {
  const schema = Joi.object().keys({
    url: Joi.string().required(),
    apiToken: Joi.string().required()
  })
  const result = Joi.validate(opts, schema)
  if (result.error) { throw result.error }
  return result.value
}

module.exports = Rooftop
