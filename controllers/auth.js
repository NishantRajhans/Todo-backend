const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {
    const {Email,Password } = req.body;
    if (!Email || !Password) {
      return res.status(200).json({
        message: "Field is missing",
      });
    }
    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(200).json({
        message: "User is not found",
      });
    }
    if (await bcrypt.compare(Password,user.Password)) {
      const token =jwt.sign(
        { Email: user.Email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      user.Token = token;
      return res.status(200).json({
        user: user,
        token: token,
        message: "User logged in successfully",
      });
    }
    return res.status(200).json({
      message: "Password does not match",
    });
  } catch (err) {
    return res.status(404).json({
      message:"user login failed "+err.message,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { Email, Password, FirstName, LastName } = req.body;
    if (!Email || !Password || !FirstName || !LastName) {
      return res.status(200).json({
        message: "Field is missing",
      });
    }
    const user =await User.findOne({ Email: Email});
    if (user) {
      return res.status(200).json({
        message: "user already exist",
      });
    }
    const hasPassword =await bcrypt.hash(Password, 10);
    const newuser=await User.create({
      Email: Email,
      Password: hasPassword,
      FirstName: FirstName,
      LastName: LastName,
    });
    return res.status(200).json({
      newuser: newuser,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      message:"user signup failed "+err.message,
    });
  }
};
