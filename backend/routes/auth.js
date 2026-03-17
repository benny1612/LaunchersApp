import express from "express";
import { ObjectId } from "mongodb";

import { getDb } from "../db.js";
import { createToken,verifyToken } from "../utils/jwtUtils.js";
const router = express.Router();

router.post("/register/create", async (req, res) => {
  try {
    const db = getDb();
    const { username, password, email, user_type } = req.body;

    if (!username || !password || !email || !user_type) {
      return res.status(400).json({ success: false, msg: "missing fields" });
    }

    const existingUser = await db.collection("users").findOne({
      $or: [{ username: username }, { user_type: user_type }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    const newUser = {
      username,
      password,
      email,
      user_type,
    };

    await db.collection("users").insertOne(newUser);
    res.status(201).json({ success: true, msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});

router.put("/register/update/:id", async (req, res) => {
  try {
    const id = req.params;
    const updateData = {};

    const db = getDb();
    const { username, password, email, user_type } = req.body;
    if (username) {
      updateData.username = username;
    }
    if (password) {
      updateData.password = password;
    }
    if (email) {
      updateData.email = email;
    }
    if (user_type) {
      updateData.user_type = user_type;
    }
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Nothing was updated" });
    }
    const updateUser = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.status(200).json({ success: true, msg: "filed update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});
router.delete("/register/delete/:id", async (req, res) => {
  try {
    const id = req.params;

    const db = getDb();
    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ success: false, msg: "user not found" });
    }
    res.status(200).json({ success: true, msg: `user deleted ` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const db = getDb();
    const { username, password } = req.body;

    const user = await db.collection("users").findOne({ username, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid username or password" });
    }

    await db
      .collection("users")
      .updateOne({ _id: user._id }, { $set: { login_last: Date.now() } });

    const token = createToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        username: user.username,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "internal server error" });
  }
});
router.get("/getUser", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, msg: "missing token" });
    }

    const decoded = verifyToken(token);
    const db = getDb();

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.id) },
    );

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
});
export default router;
