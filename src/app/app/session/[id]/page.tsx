import { notFound } from "next/navigation";
import { ReceiptView } from "@/components/receipt-view";
import { getSession } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function SessionReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession(decodeURIComponent(id));
  if (!session) notFound();
  return <ReceiptView session={session} />;
}

export function generateMetadata() {
  return {
    title: "MirrorRun receipt",
  };
}
