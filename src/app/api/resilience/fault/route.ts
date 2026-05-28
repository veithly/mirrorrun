import { NextResponse } from "next/server";
import { triggerResilienceEvent } from "@/lib/sponsor-actions";

export async function POST(req: Request) {
  const body = (await req.json()) as { sessionId: string };
  const result = await triggerResilienceEvent(body.sessionId);
  return NextResponse.json({ result });
}
