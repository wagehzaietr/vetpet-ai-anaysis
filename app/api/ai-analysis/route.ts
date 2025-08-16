import { persona } from "@/instruction";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { z } from "zod";



// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: [
        {
          role: "system",
          content: persona,
        },
        ...convertToModelMessages(messages), // User + assistant history
      ],

    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("error streaming", error);
    return new Response(JSON.stringify({ error: "Error streaming response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}