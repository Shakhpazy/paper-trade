import postgres from "postgres";

/*
Connection to the database using session pooler
*/
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

export default sql;