import { Router } from "express";
import { getAllUsers } from "../db/users.js";

const router = Router();

router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
})

router.post('/', (req, res) => {
  res.send('Create user');
});

export default router