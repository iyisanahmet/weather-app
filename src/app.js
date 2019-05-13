const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()

// DEFINE PATHS FOR EXPRESS CONFIG
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//SETUP HANDLERBARS AND ENGINE AND VIEWS LOCATION
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//SETUP STATIC DRIRECTORY
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    const data = {
        title:'Weather',
        name:'Ahmet IYISAN'
    }
    res.render('index',data)
})

app.get('/about', (req,res)=>{
    const data = {
        title: 'About',
        name: 'Ahmet IYISAN'
    }
    
    res.render('about',data)
})

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        const data ={ 
            error: 'You must enter address data...'
        }
        res.send( data )
        return
    }
    
    geocode ( req.query.address, ( error,{ latitude, longitude, location }= {})=>{
        if(error){
            res.send({ error }) 
            return 
        }

        forecast ( latitude, longitude, ( error, forecastData )=>{
            if(error){
                res.send({ error })
                return;
            }
            res.send({ location, forecastData })
        })
        
    })
})

app.get('/products', (req ,res)=>{
    
    if(!req.query.search){
        res.send({
            error:'You must provide a search value'
        })
        return
    }

    res.send({
        products:[]
    })

})


app.get('/help',(req,res)=>{
    const data = {
        title : 'Help',
        name: 'Ahmet IYISAN',
        message : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatem ab tempore reiciendis nulla. Sapiente vero, deleniti eaque sed commodi, culpa numquam error nesciunt dolores optio exercitationem. Veritatis, vitae enim'
    }
    res.render('help',data)
})


app.get('/help/*',(req,res)=>{
    
    const data = { 
        title:'404 Error Page',
        message:'Help article not found'
    }

    res.render('404', data)
})


app.get('*',(req,res)=>{
    
    const data = {
        title:'404 Error Page',
        message: 'Please check your link...'
    }
    
    res.render('404',data)
})


app.listen(3000,()=>{
    console.log('Server is up port 3000')
})

