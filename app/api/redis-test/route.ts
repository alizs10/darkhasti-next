// app/api/redis-test/route.ts

import { redis } from "@/app/lib/redis";

export async function GET() {
    await redis.set("test:key", "hello");
    const value = await redis.get("test:key");

    return Response.json({ value });
}