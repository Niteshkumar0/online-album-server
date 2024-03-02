let express = require('express');
let cors = require('cors')
let connection = require('./database/connection')
let app = express()
let PORT = process.env.PORT || 3001
let register = require('./database/registerSchema')
app.use(cors({
    origin:'*',
    methods:["POST","GET"],
    credentials:true
}))
app.use(express.json())
connection

app.get('/',(req,res)=>{
    res.json('donee')
})

app.post('/register',async(req,res,next)=>{
    try {
        let {name,email,password} = req.body
        let checkUser = await register.findOne({email})
        if (checkUser) {
            return res.json({status:false,msg:"email already taken"})
        }
            await register.create({
                name,
                email,
                password
            })
        console.log(name,email,password)    
       return res.json({status:true})
    } catch (error) {
        next(error)
    }
})


app.post('/login', async(req,res,next)=>{
    try {
        let {name,email,password} = req.body
        let user = await register.findOne({email})
        if (user) {
            if (user.name !== name) {
                return res.json({status:false,msg:"name is invalid"})
            }else if(user.password !== password){
                return res.json({status:false,msg:"password is invalid"})
            }
        }else{
            return res.json({status:false,msg:"email is invalid"})
        }

        return res.json({status:true})
        // if (user) {
        //     console.log(user.name)
        //     return res.json({msg:"hello"})
        // }
        
    } catch (error) {
        next(error)
    }
})

app.post('/imagePath',async(req,res)=>{
    try {
        let { email, imagePath } = req.body;
        let user = await register.findOneAndUpdate(
            { email },
            { $push: { imagePath: imagePath } },
        );
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})


app.get('/fetchImagePath',async(req,res)=>{
    let email = req.query.email;
    let user = await register.findOne({email})
    return res.json({return:true,user})
})

app.listen(PORT)