
const http = require("http")
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req,res) => {
    
    // lodash

    const num = _.random(0,20)
    console.log(num)

    const greet = _.once(() => {
        console.log("hello")
    })

    greet()
    greet()
    greet()

    // set header content type

    res.setHeader('Content-Type', 'text/html')

    let  path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        case '/about-gross':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
            break
    }


    // send an html file
    fs.readFile(path, (err,data) => {
        if (err) {
            console.log(err)
            res.end()
        }
        else {
            //res.write(data)
            
            res.end(data) // does the same thing as res.write(data)
        }
    })

   
})  

server.listen(3000,'localhost', () => {  //loopback ==> ip adress 127.0.0.1
    console.log('listen for request on port 3000')
}) 

