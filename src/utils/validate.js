/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  let nameRegex = /^[a-zA-Z0-9\-]+$/
  let validUsername = str.match(nameRegex)
  if(validUsername == null){
    return false
  } else {
    return true
  }
}
