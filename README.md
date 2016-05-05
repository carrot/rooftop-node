# rooftop

[![npm](http://img.shields.io/npm/v/rooftop.svg?style=flat)](https://badge.fury.io/js/rooftop) [![tests](http://img.shields.io/travis/carrot/rooftop/master.svg?style=flat)](https://travis-ci.org/carrot/rooftop) [![dependencies](http://img.shields.io/gemnasium/carrot/rooftop.svg?style=flat)](https://gemnasium.com/carrot/rooftop)

node api client for [Rooftop CMS](https://www.rooftopcms.com/)

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm i rooftop -S`

> **Note:** This project only supports Node 6+

### Usage

```js
const Rooftop = require('rooftop')

const api = new Rooftop({
  name: 'yoursubdomain',
  apiToken: 'xxx'
})

// get all posts
api.posts.get().then(console.log)

// get all case studies (custom field example)
api.caseStudies.get().then(console.log)

// get the first 5 posts
api.posts.get(5).then(console.log)

// get only posts with a matching title, works for any property
api.posts.get({ title: 'foo' }).then(console.log)
```

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
