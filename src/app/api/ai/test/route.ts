import { NextResponse } from "next/server";
import { createAIService } from "@/ai/services/ai.service";
import { aiConfig, isAIProviderEnabled } from "@/ai/config";
//
export async function GET() {
  const aiService = createAIService();
  const health = await aiService.healthCheck();
  //
  const responsePayload = {
    status: "ok",
    provider: health.provider,
    healthy: health.healthy,
    details: health.details,
    configuration: {
      provider: aiConfig.AI_PROVIDER,
      defaultModel: aiConfig.AI_DEFAULT_MODEL,
      enabled: isAIProviderEnabled(),
    },
  } as const;
  //
  return NextResponse.json(responsePayload, {
    status: 200,
  });
}
