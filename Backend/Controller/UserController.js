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

exports.login = [
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find the user in the database
            const user = await UserModel.findOne({ email });
            
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res. json({ success: false, message: 'Invalid email or password' });
            }

            // Generate a token
            const token = createToken(user._id);
            res.status(200).json({ token:token });

        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' })
        }
    }
];
