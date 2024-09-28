import { sql } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
    if (event.req.method === 'POST') {
        // Parse the body to get name and email
        const body = await readBody(event);
        const { name, email } = body;

        if (!name || !email) {
            throw createError({
                statusCode: 400,
                message: 'Name and email are required'
            });
        }

        try {
            // Insert the new user into the database
            await sql`INSERT INTO users (name, email) VALUES (${name}, ${email})`;
            return { message: 'User added successfully' };
        } catch (error) {
            console.error('Error adding user:', error);
            throw createError({
                statusCode: 500,
                message: 'Failed to add user'
            });
        }
    }

    // Handle GET request: Fetch all users
    try {
        const { rows } = await sql`SELECT * FROM users`;
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch users'
        });
    }
});
