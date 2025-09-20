const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please provide username and password!" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.log("Error in register[POST]:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.login = async (req,res) =>{
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message:"Please provide username and password!"});
        }

        const isUserExists = await User.findOne({username});

        if(!isUserExists){
            return res.status(404).json({message:"Invalid Credentials!"});
        }

        const isPasswordValid = await bcrypt.compare(password, isUserExists.password);

        if(!isPasswordValid){
            return res.status(404).json({message:"Invalid Credentials!"});
        }

        // ✅ Fix: find Info for the logged-in user
        const userInfo = await User.findOne({ username: isUserExists.username });
        
        if (!userInfo) {
            return res.status(404).json({ message: "User information not found!" });
        }

        const token = jwt.sign(
          { 
            id: isUserExists._id, 
            username: isUserExists.username,
            name: userInfo.name,
            regNo: userInfo.regNo
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.cookie("name", userInfo.name, {
          httpOnly: false,
          secure: false,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
          message:"Logged in successfully!",
          user: {
                name: userInfo.name,
                regNo: userInfo.regNo,
                username: isUserExists.username
          },
          token
        });
        
    } catch (error) {
        console.log("Error in login[POST]:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.dashboard = async (req, res) => {
  try {
    // username comes from JWT payload via authMiddleware
    const userInfo = await User.findOne({ username: req.user.username });

    if (!userInfo) {
      return res.status(404).json({ message: "User info not found!" });
    }
  } catch (error) {
    console.log("Error in dashboard[GET]:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};