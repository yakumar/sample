const fs = require("fs")

const express = require("express")

const app = express()

const hbs = require("hbs")

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next)=>{
    
    var now = new Date().toString()
    var log =`${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log(err)
        }
    })
    
    next()
    
})

// app.use((req, res, next)=>{
    
//   res.render('maintain')
    
// })



hbs.registerHelper('getCurrentYear', ()=>{
    return new Date()
})

app.get('/', (req, res)=>{
    res.render('index', {
        message:'welcome'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        message:'about page',
        pageTitle:'about page'

    })
})



app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('server initial')
})