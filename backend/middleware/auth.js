import { sql } from "../config/database"

async function VerifySession(token) {
    const { data, error } = await sql.auth.getUser(token);

    if (error || !data.user) {
        return null;
    }

    return data.user;
}

export default VerifySession