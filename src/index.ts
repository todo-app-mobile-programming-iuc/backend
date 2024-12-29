import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "./routes/user";
import { authMiddleware } from "./auth";

// will be removed to env
export const JWT_SECRET = "dork2343klfşasdmk2qen1"
declare module "hono" {
    interface Context {
        userId?: number;
    }
}

const app = new Hono<{ Bindings: Bindings }>()
app.use("*", cors());

app.get("/", (c) => c.text("Hello from Yetiştir Backend!"));

app.route('/user', user);

// app.use('*', authMiddleware);

export default app;
