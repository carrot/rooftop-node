require('dotenv').config({ silent: true })

const Rooftop = require('..')
const test = require('ava')

const api = Rooftop.new({
  url: process.env.url,
  apiToken: process.env.token
})

test('errors with incorrect options', (t) => {
  t.throws(
    () => { Rooftop.new() }, // eslint-disable-line
    'child "url" fails because ["url" is required]'
  )

  t.throws(
    () => { Rooftop.new({ url: 'foo' }) }, // eslint-disable-line
    'child "apiToken" fails because ["apiToken" is required]'
  )
})

test('initializes with correct options', (t) => {
  const api = Rooftop.new({ url: 'foo', apiToken: 'bar' })
  t.truthy(api)
})

test('errors when trying to get posts with wrong site', (t) => {
  const api = Rooftop.new({ url: 'https://rooftop-test-foo.rooftopcms.io', apiToken: 'bar' })
  return api.posts.get().catch((res) => {
    t.is(res.error.toString(), 'Error: getaddrinfo ENOTFOUND rooftop-test-foo.rooftopcms.io rooftop-test-foo.rooftopcms.io:443')
  })
})

test('errors when trying to get posts with wrong api key', (t) => {
  const api = Rooftop.new({ url: process.env.url, apiToken: 'bar' })
  return api.posts.get().catch((res) => {
    t.is(res.status.code, 403)
  })
})

test('errors when trying to get nonexistant post type', (t) => {
  return api.fooBars.get().catch((r) => t.is(r.status.code, 404))
})

test('gets data when valid data is provided', (t) => {
  return api.posts.get().then((res) => {
    t.truthy(res.length > 0)
  })
})

test('params passed to get() work correctly', (t) => {
  return api.posts.get({ search: 'regular' }).then((res) => {
    t.truthy(res.length === 1)
    t.is(res[0].slug, 'hello-world')
  })
})

test('uses (http) url instead of https', (t) => {
  const api = Rooftop.new({
    url: 'http://carrotcreativedemo.rooftopcms.io', apiToken: process.env.token
  })
  return api.posts.get().catch((res) => {
    t.is(res.url, 'http://carrotcreativedemo.rooftopcms.io/wp-json/wp/v2/posts')
  })
})

test('uses (https) when `//` is present in url', (t) => {
  const api = Rooftop.new({
    url: '//carrotcreativedemo.rooftopcms.io', apiToken: process.env.token
  })
  return api.posts.get().catch((res) => {
    t.is(res.url, 'https://carrotcreativedemo.rooftopcms.io/wp-json/wp/v2/posts')
  })
})
