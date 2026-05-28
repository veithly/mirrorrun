import { NextResponse } from "next/server";
import { readMedia } from "@/lib/store";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bytes = await readMedia(decodeURIComponent(id));
  if (!bytes) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }
  const body: Uint8Array<ArrayBuffer> = new Uint8Array(bytes.body.byteLength);
  body.set(bytes.body);
  return new Response(body, {
    headers: {
      "Content-Type": bytes.contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
