import { Router } from "express";
import { getAllAccounts, createNewAccount, updateAccount, getAccountCash} from "../db/account.js"

const router = Router()

router.get("/accounts", async (req, res) => {
    try {
        const result = await getAllAccounts()
        res.json(result)
    } catch (error) {
        res.status(500).json({
            error: error.message || "Internal server error"
        })
    }
})

router.get("/account/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await getAccountCash(id)
        res.json(result)
    } catch (error) {
        res.status(500).json({
            error: error.message || "Internal server error"
        })
    }
})

router.post("/account", async (req, res) => {
    try {
        const result = await createNewAccount(process.env.TEST_ID)
        res.json(result)
    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                error: "Account already exists"
            });
        }

        res.status(500).json({
            error: "Internal server error"
        });
    }
})

router.patch("/account", async (req, res) => {
    try {
        const result = await updateAccount(process.env.TEST_ID, 20000)
        res.json(result)
    } catch (error) {
        res.send(error)
    }
})




export default router