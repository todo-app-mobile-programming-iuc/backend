import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { and, eq } from "drizzle-orm";
import { sign } from "../auth";
import { JWT_SECRET } from "..";

const app = new Hono<{ Bindings: Bindings }>();

app.post("/", async (c) => {
  try {
    const { messages } = await c.req.json();

    const stream = await c.env.AI.run(
      "@cf/mistral/mistral-7b-instruct-v0.2-lora",
      {
        messages,
        stream: true,
      }
    );

    // @ts-ignore
    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  } catch (error: any) {
    return c.json(error.message, { status: 401 });
  }
});

export default app;
