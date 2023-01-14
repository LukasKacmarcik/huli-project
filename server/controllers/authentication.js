import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Owner from "../models/owner.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET);
};

export const getCurrentUser = async (req, res) => {
  if (req.userId === null) {
    return res.status(200).json({ userId: null });
  }

  try {
    const user = await Owner.findOne({ _id: req.userId });

    if (user == null) {
      return res.status(400).json({ message: "cannot find user" });
    }
    res.status(200).json({ userId: user._id.toString(), username: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const postLogin = async (req, res) => {
  let isValid = true;
  const message = {
    loginUsernameError: "",
    loginPasswordError: "",
  };

  if (!req.body.username.trim()) {
    message.loginUsernameError += "The username field is required.\n";
    isValid = false;
  }

  if (!req.body.password.trim()) {
    message.loginPasswordError += "The password field is required.\n";
    isValid = false;
  }

  const user = await Owner.findOne({ name: req.body.username });
  if (user == null) {
    message.loginUsernameError += "Cannot find user with the given username.\n";
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json(message);
    return;
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = createToken(user._id).toString();
      res.status(201).json({ accessToken: accessToken });
    } else {
      message.loginPasswordError += "Incorrect password.\n";
      res.status(405).json(message);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
