/**
 * @module rooftop
 */

const Joi = require('joi')

/**
 * @class Rooftop
 * @classdesc This is kind of a fake class because of our proxy hackery, but it
 * behaves like one pretty much
 */
const Rooftop = {
  /**
   * Creates a new instance, slightly unconventional
   * @constructor
   */
  new: function (opts = {}) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      apiToken: Joi.string().required()
    })
    const result = Joi.validate(opts, schema)
    if (result.error) { throw result.error }

    return new Proxy({
      opts: result.value,
      contentType: function (name) {
        console.log(this.opts)
        console.log(name)
      }
    }, proxyHandler)
  }
}

const proxyHandler = {
  get: (target, name) => {
    target.contentType(name)
  }
}

module.exports = Rooftop
