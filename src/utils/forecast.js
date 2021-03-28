const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=72b80ec3f18dee16ad22d99d11d93b5e&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " Fahrenheit out.")
        }
    })
}

module.exports = forecast