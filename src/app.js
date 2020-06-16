const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Expres  config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dennie Anna',
        footerName: 'Facepalm Industries'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Dennie Anna',
        footerName: 'Facepalm Industries'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Help us help you!',
        title: 'Help',
        name: 'Dennie Ana',
        footerName: 'Facepalm Industries'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send ({
            error: 'You must provide address.'
        })
    } 
            geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
                if(error){
                    return res.send({ error })
                }
                  forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                          return res.send({ error })
                    }
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })

                  })
              })
        })
    




app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        footerName: 'Facepalm Industries',
        message404: 'Help article not found.' 
    })
})

app.get('*', (req, res)=> {
    res.render('404page', {
        title: '404 page',
        footerName: 'Facepalm Industries',
        message404: 'Page not found.'
    })
}) 

 app.listen(port, () => {
     console.log('Server is up on port' + port)
 }) 