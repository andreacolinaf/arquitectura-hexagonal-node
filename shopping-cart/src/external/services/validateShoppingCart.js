const request = require('request')

const validate = (callback) => {
    const url = `http://localhost:3001/external/validation`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the validation service!', undefined)
        } else {
            const { valid } = body
            callback(undefined, {
                valid
            })
        }
    })
}

module.exports.validate = validate;