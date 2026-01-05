const OneCard = require("../model/oneCardUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res) => {
  const { name, username, email, password,role } = req.body;

  try {
    const existingUser = await OneCard.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already created an account with this email address",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new OneCard({
      name,
      email,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "You created an account successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, please check",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await OneCard.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const matchpassword = await bcrypt.compare(password, user.password);

    if (!matchpassword) {
      return res.status(401).json({ message: "Password is wrong" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      "dffdssfssdgfgd",
      { expiresIn:"1h" }
    );

    // Save token + update logout state
    user.tokens = token;
    user.isLogout = false;
    await user.save();


    return res.status(200).json({
      message: "Login successfully",
      user,token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const loginWithUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await OneCard.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchpassword = await bcrypt.compare(password, user.password);
    if (!matchpassword) {
      return res.status(401).json({ message: "password is worng" });
    }
        // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      "ddsdaggrrwtdadd",
      { expiresIn: "1h" }
    );

    // Save token
    user.tokens = token;
    user.isLogout = false;
    await user.save();

    res.status(200).json({ message: "Login successfully", user, token });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const isLogout = async (req, res) => {
  const userId = req.params.id; // match frontend

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await OneCard.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isLogout = true;
    user.tokens = "";  // clear token
    await user.save();

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getbyid = async (req, res) => {
  try {
    const user = await OneCard.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const update = async (req, res) => {
  const { username, phone, email } = req.body;

  if (!username || !phone || !email)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const updatedUser = await OneCard.findByIdAndUpdate(
      req.params.id,
      { username,phone, email },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "User updated succesfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await OneCard.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "User deleted successfully",
      deletedUser: deleted,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const user = await OneCard.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

     user.avatar = req.file.filename;  
    await user.save();

    return res.status(200).json({
      message: "Avatar uploaded successfully",
      updatedUser: user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  CreateUser,
  login,
  loginWithUser,
  getbyid,
  update,
  deleteUser,
  isLogout,
  uploadAvatar,
};
