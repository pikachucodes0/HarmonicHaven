import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

// Register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.user.user.userId; // Assuming req.user contains the user object with the userId
    const body = req.body; // Data to update

    // If password is provided, hash it before saving
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10); // Hash the password with a salt of 10 rounds
      body.password = hashedPassword; // Update the body with the hashed password
    }

    // Correct Sequelize update syntax
    const [updated, updatedUser] = await User.update(body, {
      where: { userId: Number(userId) }, // Where condition
      returning: true, // This will return the updated user details
    });

    // If no rows were updated, return a 404 error
    if (updated === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send success response with the updated user details
    res.status(200).send({
      message: "User updated successfully",
      data: updatedUser[0], // Return the updated user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the user" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({
      where: { userId: Number(userId) },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ data: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export { registerUser, loginUser, editProfile, getUser };
