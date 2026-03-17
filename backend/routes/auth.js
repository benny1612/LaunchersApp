import express from "express";
import { getDb } from "../db.js";

const router = express.Router();
const userTypes = ["Intelligence soldier", "air force soldier", "admin"];

router.post("/register/create", async (req, res) => {
    try {
        const db = getDb();
        const { id, username, password, email, user_type } = req.body;

        if (!id || !username || !password || !email || !user_type) {
            return res.status(400).json({ msg: "missing fields" });
        }

        if (!userTypes.includes(user_type)) {
            return res.status(400).json({ msg: "Invalid user type" });
        }

        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = {
            id,
            username,
            password,
            email,
            user_type,
        };

        await db.collection("users").insertOne(newUser);
        res.status(201).json({ msg: "User created successfully" });

    } catch (error) {
        res.status(500).json({ msg: "internal server error" });
    }
});

export default router;
