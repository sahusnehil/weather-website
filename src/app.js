const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Path for express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup of handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup of static directory to Server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Snehil Sahu'

    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title:'This is about Me',
        name:'Snehil Sahu',
        messageFour:'This site was created by Snehil Sahu. In this you can get Weather Information about any city. Here I used some other company services to get response. '
    })
})

app.get('/Help',(req, res) => {
    res.render('help',{
        helpNeeded:'We all need help to get out of our comfort zone',
        message:'You cant skip Chapters, thats not how Life Works.You have to read every line, meet every character.You wont enjoy all of it, Hell some chapters will make you cry for weeks but you have to keep going.Stories keep the World revolveing,Live yours dont miss out.',
        title:'Help',
        name:'Snehil Sahu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })
    }
      geocode(req.query.address, (error, { latitude, longitude, location }={}) =>{
           if (error){
               return res.send({ error })
           }

      forecast( latitude, longitude , (error, forecastData) =>{
           if (error){
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

app.get('/products', (req, res) =>{
    if(!req.query.search){
    return res.send({
         error:'You must provide a Search term'
     })
    }
    console.log(req.query.search)
     res.send({
    products: []
      })
 })

app.get('/help/*',(req ,res) => {
    res.render('404',{
        title :'404',
        name:'Snehil Sahu',
        errorMessage: 'Help Article not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        name:'Snehil Sahu',
        errorMessage: 'Page not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

