const express = require('express')
const app = express()

const middleware = (req,res,next) =>{
    console.log("hi this is middleware");
    next()
}

app.use(middleware)

app.get('/',middleware,(req,res) =>{
    res.send("Hi This is GET request")
})

app.get('/test',middleware,(req,res) =>{
    res.send("This is Test Url")
})

app.post("/",(req,res) =>{
    res.send("Hi This is POST request")
})

app.put("/",(req,res) =>{
    res.send("Hi This is PUT request")
})

app.delete("/",(req,res) =>{
    res.send("Hi This is DELETE request")
})

const PORT = 3000
app.listen(PORT,()=> console.log(`Server is running at ${PORT}`))