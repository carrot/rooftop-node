require('dotenv').config()

const Rooftop = require('..')
const test = require('ava')

test('errors with incorrect options', (t) => {
  t.throws(
    () => { Rooftop.new() }, // eslint-disable-line
    'child "name" fails because ["name" is required]'
  )

  t.throws(
    () => { Rooftop.new({ name: 'foo' }) }, // eslint-disable-line
    'child "apiToken" fails because ["apiToken" is required]'
  )
})

test('initializes with correct options', (t) => {
  const api = Rooftop.new({ name: 'foo', apiToken: 'bar' })
  t.truthy(api)
})

test('errors when trying to get posts with wrong site', (t) => {
  const api = Rooftop.new({ name: 'foo', apiToken: 'bar' })
  return api.posts.get().catch((res) => {
    t.is(res.error.toString(), 'Error: getaddrinfo ENOTFOUND foo.rooftopcms.io foo.rooftopcms.io:80')
  })
})

test('errors when trying to get posts with wrong api key', (t) => {
  const api = Rooftop.new({ name: process.env.name, apiToken: 'bar' })
  return api.posts.get().catch((res) => {
    t.is(res.status.code, 403)
  })
})

test('errors when trying to get nonexistant post type', (t) => {
  const api = Rooftop.new({
    name: process.env.name,
    apiToken: process.env.token
  })

  return api.fooBars.get().catch((r) => t.is(r.status.code, 404))
})

test('gets data when valid data is provided', (t) => {
  const api = Rooftop.new({
    name: process.env.name,
    apiToken: process.env.token
  })

  return api.posts.get().then((res) => {
    t.truthy(res.length > 0)
  })
})
