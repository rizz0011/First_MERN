const USERMODEL = require("../models/User");

const jwt = require("jsonwebtoken")



async function userSignup(req, res) {
  const body = req.body;
  try {
    await USERMODEL.create({
      name: body?.name,
      email: body.email,
      password: body.password,
    });
  
    return res.status(201).json({message:'User Created Successfully'})
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error
    })
  }

}

async function userLogin(req, res) {
 
  try {
    const {email, password} = req.body;
    const existingUser = await USERMODEL.findOne({email})
    if(!existingUser) {
      throw new Error("User does not exist")
    }
    if(existingUser.password !== password) {
      throw new Error("Invalid credential")
    }

     // Generate JWT token
    const token =jwt.sign({ email: existingUser.email }, 'rizz012345khan', { expiresIn: '1h' })

   const userLog =  await USERMODEL.findOneAndUpdate({
     email
    
    }, {$set : {token:token}}, {new:true});
  
    return res.status(201).json({message:'User Login Successfully', user:userLog})
  } catch (error) {
    console.log(error)
    res.status(500).json({
     
      sucess: false,
      message: error
    })
  }

}



async function userProfile(req, res) {
try {
  const {userID} = req.params
  const userProfile = await USERMODEL.findOne({userID})
  return res.status(200).json({user:userProfile})
} catch (error) {
  res.status(500).json({
    sucess: false,
    message: error
  })
}

}




module.exports = {
    userSignup,
    userLogin,
    userProfile
}
