
require = require("esm")(module/*, options*/)
const should = require('chai').should()
const CharSet = require('../lib/CharSet').default

describe('lib', function () {
  describe('CharSet', function () {
    it('should be the same size as its number of unique characters', function () {
      let foo = new CharSet('foo')
      let bar = new CharSet('bar')
      let specialChars = new CharSet('_ _ !()[]{}')
      foo.getSize().should.equal(2)
      bar.getSize().should.equal(3)
      specialChars.getSize().should.equal(9)
    })

    it('should pass allowByBlacklist when none of the characters are on the blacklist', function () {
      let set = new CharSet('<script>alert("test")</script>')
      set.allowedByBlacklist('567nmu').should.be.true
      set.allowedByBlacklist('[]SCRIPT;').should.be.true
    })

    it('should fail the allowByBlacklist check when it CharSet contains blacklisted chars', function () {
      let set = new CharSet('<script>alert("test")</script>')
      set.allowedByBlacklist('<').should.be.false
      set.allowedByBlacklist('p').should.be.false
      set.allowedByBlacklist('script').should.be.false
    })

    it('should pass allowByWhitelist when all of the characters are whitelisted', function () {
      let set = new CharSet('<script>alert("test")</script>')
      set.allowedByWhitelist('<script>alert("tes)/').should.be.true
      set.allowedByWhitelist('<script>alert("tes)/Other values$%^&')
    })

    it('should fail allowByWhitelist check when any characters are absent from whitelist', function () {
      let set = new CharSet('<script>alert("test")</script>')
      set.allowedByWhitelist('<script>alert("tes)').should.be.false
      set.allowedByWhitelist('script').should.be.false
    })
  })
})