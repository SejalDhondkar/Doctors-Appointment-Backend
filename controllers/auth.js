const UserModel = require('../models/user')
const RoleModel = require('../models/role')
const { hashPassword, signToken } = require('../helpers/auth')

module.exports.register = async (req,res)=>{
    
    const { email, password } = req.body;

    const isEmailTaken = await UserModel.findOne({email});
    if(isEmailTaken) return res.status(400).json({message:"Email is already taken"})

    try {
      const {salt, hash} = hashPassword(password);

      delete req.body.password;

      const userRole = await RoleModel.findOne({name: req.body.role});      
      console.log(userRole);

      await UserModel.create({...req.body, salt, hash, role: userRole._id});
      res.status(201).json({
        message: "User registered",
        token: signToken({email: req.body.email}),
      });

    } catch (error) {
        console.log(error);
        res.status(500).send({message:'internal server error'})
    }
  }


module.exports.login = async (req,res) =>{
  try {
    const { email, password} = req.body;

    const userData = await UserModel.findOne({email}).populate({
        path: "role",
        select: ['name']
    });
    if (!userData) return res.status(400).json({message: "User is not Registered"});

    const hashedPass = hashPassword(password, userData.salt);
    if (hashedPass.hash === userData.hash) {
      //Redirect Checks after login
      return res.status(200).json({
        message: "User Login Successful",
        token: signToken({email: req.body.email}),
        data: {
          name: userData.firstname + " " + userData.lastname,
          email: userData.email,
          role: userData.role.name
        },
      });
    }
    return res.status(400).json({message: "Incorrect credentials"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
}