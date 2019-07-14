const immutable = require('immutable')

/**
* Comparable character sets for blacklisting and whitelisting characters based on strings
* @export
* @class CharSet
*/
class CharSet {
  /**
  * Creates an instance of CharSet.
  * @param {string} string to use to derive the charset
  * @memberof CharSet
  */
  constructor (string) {
    this.__set__ = immutable.Set(string.split(''))
  }

  /**
  * Checks whether any characters in the blacklist string are in the charset
  * Returns true if no blacklisted chars appear in the charset
  * @param {string} blacklistString
  * @returns {boolean}
  * @memberof CharSet
  */
  allowedByBlacklist (blacklistString) {
    const blacklistCharSet = immutable.Set(blacklistString)
    return this.__set__.intersect(blacklistCharSet).size === 0
  }

  /**
  * Checks whether any characters in the charset do not appear in the
  * whitelist string.
  * Returns true if all characters are whitelisted.
  * @param {string} whitelistString
  * @returns {boolean}
  * @memberof CharSet
  */
  allowedByWhitelist (whitelistString) {
    const whitelistCharSet = immutable.Set(whitelistString)
    return this.__set__.isSubset(whitelistCharSet)
  }

  getSize () {
    return this.__set__.size
  }
}

module.exports = CharSet
