const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
    },
    
    password: {
    type: String,
    required: true,
    minlength: 6
    },

    phone: {
    type: String,
    required: true
    },

    bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"]
    },

    dateOfBirth: {
    type: Date,
    required: true
    },

    weight: {
    type: Number,
    required: true,
    min: 45
    },

    phone: {
    type: String,
    required: true
    },

    bloodGroup: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    weight: {
        type: Number,
        required: true,
        min: 45
    },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);