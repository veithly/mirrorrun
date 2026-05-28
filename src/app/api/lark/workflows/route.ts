import { NextResponse } from "next/server";
import { createLarkWorkflow } from "@/lib/sponsor-actions";

export async function POST(req: Request) {
  const body = (await req.json()) as { sessionId: string };
  const result = await createLarkWorkflow(body.sessionId);
  return NextResponse.json({ result });
}
