const request = require('request')


const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/43cc3c2860c38ac0d50216a8f95fe05e/'+longitude+','+latitude+'?units=si&lang=fi'
    request({url: url, json:true},(error,{body}) => {
        if(error){
            callback('Ei saatu yhteyttä sääpalveluun!',undefined)
        }else if(body.error){
            callback('Haulla ei löytynyt säitä, kokeile toista hakua',undefined)
        }else{
            callback(undefined,{
                description: body.currently.summary,
                temperature: body.currently.temperature,
                rainchance: body.currently.precipProbability,
                timezone: body.timezone,
                windspeed: body.currently.windSpeed

            })
        }
    })
}

    

module.exports = forecast