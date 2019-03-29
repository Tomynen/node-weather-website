const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//Define paths and setup for handlebars
const partialPaths = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../templates/views'))

hbs.registerPartials(partialPaths)

//Define path for express static folder

app.use(express.static(path.join(__dirname, '../public')));




//req request and res response

  
app.get('', (req,res) => {
    res.render('index',{
        title: "Weather search",
        name: "Tomi Turunen"
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: "You didn't provide address to the query string of URL"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        const sijainti = location
        forecast(latitude,longitude, (error, {temperature,description,windspeed}) => {
            if(error){
                console.log(error)
            }
            res.send({
                temperature: temperature,
                description: description, 
                location: sijainti,
                windspeed: windspeed
            })
        })
    })
})

app.get('/help', (req,res)=>{

    res.render('help',{
        help1: "Click X to close page",
        title: "Help",
        name: "Tomi Turunen"
    })


})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            ERROR: "Search term was not in the query string of the URL"
            })
    }

    console.log(req.query.paska)
    res.send({
        products: []
    })
})



app.get('/about', (req,res) => {
    res.render('about',{
        name: "Tomi Turunen",
        title: "about eli juu sivu"
    })
})




app.get('/help/*',(req,res) => {
    res.render('404page',{
        errorMsg: "Apustus sivua ei löydy"
    })
})

app.get('*',(req,res) => {
    res.render('404page',{
        errorMsg: "Sivua ei löydy lainkaan"
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})
























