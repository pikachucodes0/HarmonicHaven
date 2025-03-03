import bcrypt from "bcrypt";
import User from "../model/userSchema.js";
import { generateToken } from "../security/jwt-util.js";

const login = async (req, res) => {
  try {
    // Check if email and password are provided
    if (!req.body.email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Fetch user from the database by email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // If password matches, generate JWT token
    const token = generateToken({ user: user.toJSON() });

    // Return the token and user role
    return res.status(200).send({
      data: {
        access_token: token,
        role: user.role,
        userId: user.userId,
        username: user.username,
      },
      message: "Successfully logged in",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to log in" });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password; // Do not send password in response
    res
      .status(200)
      .send({ data: user, message: "Successfully fetched current user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

export { login, init };
