import { NextResponse } from "next/server";
import { credentialCatalog, providerHealth } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    credentials: credentialCatalog,
    providers: providerHealth(),
  });
}
