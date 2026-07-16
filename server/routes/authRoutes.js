const express = require("express");
const {
    registerUser,
    loginUser,
    updateProfile
} = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route accessed successfully",
        user: req.user
    });
});
router.put("/profile", protect, updateProfile);
module.exports = router;