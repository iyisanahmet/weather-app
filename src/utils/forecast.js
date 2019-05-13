const request = require('request')


const forecast =  (lat,long, callback)=>{
    
    const url = `https://api.darksky.net/forecast/8b501ca578de1079bd18365766397b25/${lat},${long}`

    request({url,json:true},(error, {body})=>{

        if(error){
            callback('Unable to connect to the server',undefined)
        }else if(body.error){
            callback('Unble to find weather forecast.Try again...',undefined)
        }else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out...`)
        }

    })
}


module.exports = forecast