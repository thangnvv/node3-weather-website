const request = require('request')

const forecast = (latitude, longitude, address, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=60bbec4255c373422a125858757ec13f&query=' + latitude + ',' + longitude + '&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=60bbec4255c373422a125858757ec13f&query=' + address + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather service!', undefined)
        } else if (body.error) {
            callback(undefined, 'Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
        }
    })
}

module.exports = forecast