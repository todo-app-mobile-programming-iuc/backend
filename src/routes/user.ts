import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../../db/schema/users";
import { and, eq } from "drizzle-orm";
import { sign } from "../auth";
import { JWT_SECRET } from "..";

const app = new Hono<{ Bindings: Bindings }>();

app.post('/login', async (c) => {
	try {
		const { email, password } = await c.req.json();

        const hashedPassword = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
		const hashedPasswordHex = Array.from(new Uint8Array(hashedPassword))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('');

		const result = await drizzle(c.env.DB)
			.select()
			.from(users)
			.where(and(eq(users.email, email), eq(users.password, hashedPasswordHex)))
			.all();

		if (result.length === 0) throw new Error('Invalid email or password');

		const token = await sign(
			{
                userId: result[0].id,
				facilityId: result[0].facility_id,
			},
			JWT_SECRET
		);
		return c.json({ token });
	} catch (error: any) {
		return c.json(error.message, { status: 401 });
	}
});

app.post('/register', async (c) => {
    try {
        const { email, password, name, facility_id } = await c.req.json();

        // Hash the password
        const hashedPassword = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
        const hashedPasswordHex = Array.from(new Uint8Array(hashedPassword))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');

        // Check if user already exists
        const existingUser = await drizzle(c.env.DB)
            .select()
            .from(users)
            .where(eq(users.email, email))
            .all();

        if (existingUser.length > 0) {
            throw new Error('User already exists');
        }

        // Create new user
        const result = await drizzle(c.env.DB)
            .insert(users)
            .values({
                email,
                password: hashedPasswordHex,
                name,
                facility_id
            })
            .returning()
            .get();

        return c.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error: any) {
        return c.json(error.message, { status: 400 });
    }
});

export default app;
