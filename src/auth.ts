import jwt from "@tsndr/cloudflare-worker-jwt";

import { Context, Next } from "hono";
import { JWT_SECRET } from ".";

const authMiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header("Authorization");

    if (!token) {
      console.log(c.req.url)
      return c.json({ message: "No token" }, { status: 401 });
    }
    const [type, value] = token.split(" ");

    if (type !== "Bearer") {
      throw new Error("Invalid token");
    }

    const isValid = await jwt.verify(value, JWT_SECRET);
    if (!isValid) {
      throw new Error("Invalid token");
    }
    const { payload } = jwt.decode(value) as any;
    if (!payload) throw new Error("Invalid token. no token");
    if (!payload.userId) throw new Error("Invalid token. no userId");

    c.userId = payload.userId;

    return next();
  } catch (error: any) {
    return c.json(
      { message: error.message ? error.message : "Invalid token" },
      { status: 401 }
    );
  }
};

const sign = async (payload: any, secret: string) => {
  try {
    const options = {
      nbf: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    const token = await jwt.sign({ ...payload, ...options }, secret);
    return token;
  } catch (error: any) {
    throw new Error("Invalid token");
  }
};

export { authMiddleware, sign };