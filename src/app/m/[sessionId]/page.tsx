import { MobileShopper } from "@/components/mobile-shopper";

export const dynamic = "force-dynamic";

export default async function MobilePage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  return <MobileShopper sessionId={decodeURIComponent(sessionId)} />;
}
