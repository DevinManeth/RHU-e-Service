const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

        return res.status(200).json({message:"Logged in successfully!"});
        
    } catch (error) {
        console.log("Error in login[POST]:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}