const withSass = require('@zeit/next-sass')
module.exports = withSass({
  /* config options here */
})

const withImages = require('next-images')
module.exports = withImages({ esModule: true })