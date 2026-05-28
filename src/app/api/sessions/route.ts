import { NextResponse } from "next/server";
import { createLaunchSession, listSessions } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ sessions: await listSessions() });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { name?: string };
  const session = await createLaunchSession(body.name || "Spring Launch");
  return NextResponse.json({ session });
}
