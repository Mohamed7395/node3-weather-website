const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibW9oYW1lZHNhbWVlciIsImEiOiJjazFyMmZtNHMwMHVrM2NuMXo3Ynd3N2Y0In0.TFQiKWxkOCV_VGcdjTZ2NA&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location, try another search !", undefined);
        } else {
            callback(undefined, { 
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    }) 
}

const revGeoCode = (latitude, longitude, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + ".json?access_token=pk.eyJ1IjoibW9oYW1lZHNhbWVlciIsImEiOiJjazFyMmZtNHMwMHVrM2NuMXo3Ynd3N2Y0In0.TFQiKWxkOCV_VGcdjTZ2NA&limit=1"

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback ("Unable to connect to location services!", undefined)
        } else if (body.features.length === 0) {
            callback ("Coordinates not found!", undefined)
        } else {
            callback (undefined, {
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {geocode,
    revGeoCode}