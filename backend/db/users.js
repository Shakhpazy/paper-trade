import sql from "../config/database.js"

async function getAllUsers() {
    const users = await sql`
    SELECT id, email, created_at
    FROM auth.users
    `;

    return users
}







export { getAllUsers }