
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const { result } = require('lodash');
const { response } = require('express');
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sahilcomp:dazai1773@nodetut.sjzukpj.mongodb.net/node-tutorial?retryWrites=true&w=majority'

mongoose.set({strictQuery: true})
mongoose.connect(dbURI)
.then((result) => {
    app.listen(3000, () => {
        console.log("listen for request on port 3000 using app.js")
     });
})
.catch((err) => console.log(err)) 
// register view engine
app.set('view engine', 'ejs')

// middleware and static files

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan('dev'))

// mongoose and mongo sandbox routes

// app.get('/add-blog',  (req,res) => {
//     const blog = new Blog({
//         title: 'new Blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/all-blogs', (req,res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/single-blog', (req,res) => {
//     Blog.findById('63b2efb4d4a0aec92943c0c8')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// routes

app.get('/' ,(req,res) => {
    // res.send("<h1> home page </h1>")
    // const blogs = [
    //     {title:'Yoshi finds eggs', snippet: 'how can roshi find the eggs he must have some kind of superpower'},
    //     {title:'Mario finds stars', snippet: 'how can mario find the stars he must have some kind of superpower'},
    //     {title:'How to defeat browser', snippet: 'You cannot'}
        
    // ]
    
    // res.render('index', {title:"home",blogs})

    res.redirect('/blogs')

 })
 

app.get('/about' ,(req,res) => {
    // res.send("<h1> about page </h1>")
    res.render('about', {title:"About"})
 })



 
 // redirect
app.get('/about-us', (req,res) => {
    res.redirect('about')
})

// blogs routes
app.use('/blogs',blogRoutes);


// 404 page  // should always be at the bottom of the file
app.use((req,res) => {
    res.status(404).render('404', {title:"404"})
})
