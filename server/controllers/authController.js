const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {

        const {
            fullName,
            email,
            password,
            phone,
            bloodGroup,
            gender,
            dateOfBirth,
            weight
        } = req.body;

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            bloodGroup,
            gender,
            dateOfBirth,
            weight
        });

        const token = jwt.sign({ id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: userResponse
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    registerUser
};