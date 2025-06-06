import authModel from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthController{
    static userRegistration = async (req,res)=>{
  const {username,email,password} = req.body;
        try{
            if( username && email && password) {
               const isUser = await authModel.findOne({email:email});
               if(!isUser){
                const genSalt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,genSalt);

                //save a User
                const newUser = new authModel({
                    username,
                    email,
                    password: hashedPassword
                  });

                const savedUser =await newUser.save();
                if( savedUser){ 
                    return  res.status(200).json({ message: "User registered successfully" });
                }
               } else{
                return  res.status(400).json({ message: "User already exists" });

               }
            } else {
                return  res.status(400).json({ message: "all fields are required" });

            }
        }catch (error) {
        return  res.status(400).json({ message: error.message });
        }
            };
    static userLogin = async (req,res)=>{
        const {email,password} = req.body;
        try {
          if(email && password){
            const isEmail = await authModel.findOne({email:email});
            if(isEmail){
              if(
                isEmail.email === email && 
                (await bcrypt.compare(password,isEmail.password))
            )
            {
                // genarte Token
                const token = jwt.sign({ userID:isEmail._id },"pleasesubscribe",{
                    expiresIn: "5d"
                });

                return res.status(200).json({
                    message: "Login Successfull",
                    token,
                    name: isEmail.username,
                    password: isEmail.password
                });
              }
              else{
                return  res.status(400).json({ message: "Email or Password is incorrect"  });
              }
            }
            else{
              return  res.status(400).json({ message: "User does not exist" });
            }
          }  
          else{
            return  res.status(400).json({ message: "all fields are required" });
          }
        } catch (error) {
            return  res.status(400).json({ message: error.message });

        }
    };
      
}

export default AuthController;