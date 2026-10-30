import sql from "../config/database.js";
const STARTINGCASH = 10000 


async function getAllAccounts() {
    const accounts = await sql`
    SELECT * 
    FROM accounts
    `
    return accounts
}

async function createNewAccount(userId) {
    const result = await sql`
    INSERT INTO accounts (user_id, cash_balance)
    VALUES (${userId}, ${STARTINGCASH})
    RETURNING *
    `;

    return result[0]
}

async function updateAccount(userId, cash) {
    const result = await sql`
        UPDATE accounts
        SET cash_balance = ${cash}
        WHERE user_id = ${userId}
        RETURNING *
    `;

    return result[0];
}

async function getAccountCash(userId) {
    const result = await sql`
        SELECT cash_balance
        From accounts
        WHERE user_id = ${userId}
    `
    return result[0]
}

export { getAllAccounts, createNewAccount, updateAccount, getAccountCash }