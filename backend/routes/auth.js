import express from "express";
import { getDb } from "../db.js";

const router = express.Router();

router.post("/register/create", async (req, res) => {
  try {
    const db = getDb();
    const { username, password, email, user_type } = req.body;

    if (!username || !password || !email || !user_type) {
      return res.status(400).json({ success: false, msg: "missing fields" });
    }

    const existingUser = await db.collection("users").findOne({
      $or: [
        { username: username },
        { user_type: user_type }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
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

export default router;
