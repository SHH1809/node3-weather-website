const request = require ('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0c578047e108bffe70e269034cbbe7ad&query=' + latitude +','+ longitude + '&units=m'
    // const url = 'http://api.weatherstack.com/current?access_key=0c578047e108bffe70e269034cbbe7ad&query=59.3944,18.06861&units=m'

    request ({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Wind speed is '+ body.current.wind_speed + ' kmh with a UV index of ' + body.current.uv_index + '.')
        }
    })
}
    
module.exports = forecast