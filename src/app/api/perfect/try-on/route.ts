import { NextResponse } from "next/server";
import { callPerfectTryOn } from "@/lib/sponsor-actions";

export async function POST(req: Request) {
  const body = (await req.json()) as { sessionId: string; styleBrief: string };
  const result = await callPerfectTryOn(body.sessionId, body.styleBrief || "launch look");
  return NextResponse.json({ result });
}
