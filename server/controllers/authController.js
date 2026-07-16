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

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
            if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

            const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
}
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
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
const updateProfile = async (req, res) => {

    try {
        const userId = req.user._id;
        const {
            fullName,
            phone,
            bloodGroup,
            gender,
            dateOfBirth,
            weight
        } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            fullName,
            phone,
            bloodGroup,
            gender,
            dateOfBirth,
            weight
        },
        {
            new: true
        }
    ).select("-password");
        res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser
    });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    updateProfile
};