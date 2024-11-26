const UserModel = require('../Module/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (id) =>{
    return jwt.sign({id},'key_word',{expiresIn:"1h"} )
}

exports.singup = [
    async (req,res)=>{
        try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

          const New_user =new UserModel({
            name:req.body.name,
            email:req.body.email, 
            password:hashedPassword
          })

         await New_user.save().then(()=>res.send("Data Saved")).catch((er)=>res.send(er))

        }catch(er){
            res.send("Somthing went worng" , er)
        }
    }
]

exports.login=[
    async(req,res)=>{
        try{
            
        const {email,password} = req.body

        const user = await UserModel.findOne({email})

        if(!user){
            res.json({success:false,message:"User doesn't exits"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({token:token})
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }
        }catch(err){
            res.json({success:true,message:err.message})
        }
    }
]