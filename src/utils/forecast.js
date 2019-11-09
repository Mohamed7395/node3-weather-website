const request = require ("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/8217029cb0b94d15a901b16bed1a03b2/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si"; 
    
    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const summary = body.daily.data[0].summary;
            const temperature = body.currently.temperature;
            const highTemp = body.daily.data[0].temperatureHigh;
            const lawTemo = body.daily.data[0].temperatureLow;
            const rain = body.currently.precipProbability;

            callback(undefined, summary + " It's currently "+ temperature +" degrees out. The high today is " + highTemp + " with a low of "+ lawTemo +". There is a " + rain + "% chance of rain.");
        }
    })
}

module.exports = forecast;