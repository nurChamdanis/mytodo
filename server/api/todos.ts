import { sql } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
    if (event.req.method === 'POST') {
        const body = await readBody(event);
        const { todos } = body;

        if (!todos) {
            throw createError({
                statusCode: 400,
                message: 'todos required'
            });
        }

        try {
            const desc = todos;

            // Insert todo description into the database using parameterized query
            await sql`INSERT INTO todos (description) VALUES (${desc})`;

            return { message: 'Todo added successfully', description: desc };
        } catch (error) {
            console.error('Error inserting todo:', error);
            throw createError({
                statusCode: 500,
                message: 'Failed to add todo'
            });
        }
    } else { 
        try {
            const { rows } = await sql`SELECT * FROM todos`;
            return rows;
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw createError({
                statusCode: 500,
                message: 'Failed to fetch todos'
            });
        }
    }
});
