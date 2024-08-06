const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.sendStatus(400).json({
        success: false,
        message: "user already exists",
      });
    }
    //hashing password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.sendStatus(500).json({
        success: false,
        message: "Error hashing password",
      });
    }
    const createUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.sendStatus(200).json({
      success: true,
      message: "User created successfully",
      data: createUser,
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).json({
      message: "user can not registered please try again",
      success: false,
    });
  }
};
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status.send(400).json({
                success:false,
                message:"Please enter email and password"
            })
        }
    
    //check for register user
    let user =await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"user doesnot exist",});
    }
    //verifying password and generating jwt token
    const payload={
        email:user.email,
        id:user._id,
    };
    if(await bcrypt.compare(password,user.password)){
        //password match
        let token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        user.token=token;
        user.password=undefined;
        const options={
            expires:new Date(Date.now()+3*24*60*60*100),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"user logged in successfully"
        })
    }
    else{
        //password not matched
        return res.status(400).json({
            success:false,
            message:"Password does not match",
        })
    }
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
