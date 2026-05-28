import { NextResponse } from "next/server";
import { appendEvent, saveMedia, updateSession } from "@/lib/store";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file");
  const sessionId = String(data.get("sessionId") || "");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }
  if (!sessionId) {
    return NextResponse.json({ error: "Session id is required" }, { status: 400 });
  }
  const media = await saveMedia(file);
  await updateSession(sessionId, { shopperImageUrl: media.url });
  await appendEvent(sessionId, "Shopper image stored", `${media.bytes} bytes stored for launch proof.`);
  return NextResponse.json({ media });
}
