const express = require('express')
const uuid = require('uuid')
const app = express()

const members = [{
    id:1,
    name:"John Doe",
    email:"john@gmail.com",
    status:"active"
}, {
    id:2,
    name:"Jane Doe",
    email:"jane@gmail.com",
    status:"inactive"
}, {
    id:3,
    name:"Steve",
    email:"steve@gmail.com",
    status:"active"
}]

app.use(express.json())

app.get("/showAllUser",(req,res)=>{
    res.status(200).json(members)
})


app.get("/showUser/:uid",(req,res)=>{
    const id = (req.params.uid);
    const user = members.filter(member => member.id === parseInt(id))
    user.length !==0 ? res.status(200).json(user) : res.status(200).json({msg:"User Not Found"})
})

app.post("/addUser/",(req,res)=>{
    // const name = req.body.name
    // const email = req.body.email
    // const password = req.body.password
    const {name,email} = {...req.body}
    members.push({id:uuid.v4(),name,email})
    res.status(200).json(members)
})

app.delete("/deleteUser/:uid",(req,res)=>{
    const id = parseInt(req.params.uid)
    const found = members.some(member => member.id === id)
    if(found){
        const results = members.filter(member=> member.id !== id)
        res.status(200).json(results)
    }else{
        res.status(400).json({msg:`No member found with the ID of ${id}`})
    }
})

app.put("/updateUser/:id",(req,res)=>{
    const found = members.some(member=> member.id === parseInt(req.params.id))
    if(found){
        const updMember = req.body
        members.forEach(member => {
           if(member.id === parseInt(req.params.id)){
                member.name = updMember.name
                member.email = updMember.email
            }
        })
        res.status(200).json(members)
    }
    else{
        res.status(400).json({msg:`No member found with the id of ${req.params.id}`})
    }
})

const PORT = process.env.PORT ||3000
app.listen(PORT,()=> console.log(`Server is running at ${PORT}`));