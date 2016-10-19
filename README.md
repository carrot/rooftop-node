# rooftop

[![npm](http://img.shields.io/npm/v/rooftop-client.svg?style=flat)](https://badge.fury.io/js/rooftop-client) [![tests](http://img.shields.io/travis/carrot/rooftop-node/master.svg?style=flat)](https://travis-ci.org/carrot/rooftop-node) [![dependencies](https://img.shields.io/david/carrot/rooftop-node.svg?style=flat)](https://david-dm.org/carrot/rooftop-node)

node api client for [Rooftop CMS](https://www.rooftopcms.com/)

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm i rooftop-client -S`

> **Note:** This project only supports Node 6+

### Usage

```js
const Rooftop = require('rooftop-client')

const api = Rooftop.new({
  url: 'https://yoursubdomain.rooftopcms.io',
  apiToken: 'xxx'
})

// get all posts
api.posts.get().then(console.log)

// get all case studies (custom field example)
api.caseStudies.get().then(console.log)

// get the first 5 posts
api.posts.get(5).then(console.log)

// get only posts with content matching the search query
// see http://v2.wp-api.org/reference/posts/ for possible params
api.posts.get({ params: { search: 'hello' } }).then(console.log)
```

### Testing
To run the tests locally, you'll need to add a `test/.env` with your name and token values:
- `cp test/.env.sample test/.env`
- `name` is derived from your Rooftop url. Assuming your URL is https://myproject.rooftop.io then **myproject** is your name value
- `token` can be found <https://[myproject].rooftopcms.io/wp-admin/admin.php?page=rooftop-overview>

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
