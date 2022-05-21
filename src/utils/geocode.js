const request = require('request')

const geocode = function (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhhbmdudnYiLCJhIjoiY2wya3FtcHFyMGFoeDNkcGlkMTluM3JlNCJ9.FSG77EhYpPRHb_KdqVWbdw&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect the services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
                address: address
            })
        }
    })
}

module.exports = geocode