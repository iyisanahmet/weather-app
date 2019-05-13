const request = require('request')

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=2&access_token=pk.eyJ1IjoiaXlpc2FuYWhtZXQiLCJhIjoiY2p2azB3ZXcwMGdraTQzcGJ0ZWVtNDViaSJ9.j68K7BGAUaQCO4jcyT7gDQ`;

    request({url, json: true}, (error ,{body})=>{

        const {features} = body

        if(error){
            callback('Unable to connect to the server',undefined)
        }else if (features.length === 0){
            callback('Unable to finde location. Try another one...',undefined)
        }else{
            callback(undefined, {
                latitude: features[0].center[0],
                longitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}


module.exports = geocode