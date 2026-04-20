import User from "../models/user.js";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await User.findOne({ email, password });
        if (user) {
            return res.status(200).json({ message: "Login Successful" });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
}

export { loginUser, createUser, getUser, updateUser, deleteUser };