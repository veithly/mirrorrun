import { crusoeClient, crusoeModel } from "@/lib/ai";
import { appendEvent, getSession, updateSession } from "@/lib/store";

export async function POST(req: Request) {
  const { sessionId }: { sessionId: string } = await req.json();
  const client = crusoeClient();
  if (!client) {
    await appendEvent(
      sessionId,
      "Crusoe credentials required",
      "Add CRUSOE_API_KEY to stream a Nemotron launch checklist.",
      "needs_credentials",
    );
    return Response.json({
      status: "needs_credentials",
      title: "Crusoe credentials required",
      detail: "Add CRUSOE_API_KEY to stream a Nemotron launch checklist.",
      setupUrl: "https://console.crusoecloud.com/request-foundry",
    });
  }

  const session = await getSession(sessionId);
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model: crusoeModel(),
          stream: true,
          temperature: 0.4,
          max_tokens: 500,
          messages: [
            {
              role: "system",
              content:
                "You are MirrorRun's launch-readiness agent. Return concise operator-facing retail QA steps and recovery checks. Do not mention internal implementation details.",
            },
            {
              role: "user",
              content: `Create a launch checklist for session ${sessionId}. Style brief: ${session?.styleBrief || "launch look"}. Focus on try-on result, provider health, graceful recovery, and Lark replay.`,
            },
          ],
        });

        let text = "";
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content || "";
          if (!delta) continue;
          text += delta;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
        }
        await updateSession(sessionId, { recommendation: text });
        await appendEvent(sessionId, "Nemotron launch checklist streamed", "Recommendation and recovery checks stored.");
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Agent request failed";
        await appendEvent(sessionId, "Nemotron request returned an error", message, "degraded");
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
