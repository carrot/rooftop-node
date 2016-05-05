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

test('proxy', (t) => {
  const api = Rooftop.new({ name: 'foo', apiToken: 'bar' })
  api.foo
})
