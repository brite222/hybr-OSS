import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type SocialStatPayload = {
  platform: string;
  periodLabel: string;
  followers?: number;
  impressions?: number;
  likes?: number;
  views?: number;
  listGrowth?: number;
};

export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  const expected = `Bearer ${process.env.SOCIAL_WEBHOOK_SECRET}`;
  if (!process.env.SOCIAL_WEBHOOK_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: SocialStatPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.platform || !body.periodLabel) {
    return NextResponse.json({ error: "platform and periodLabel are required" }, { status: 400 });
  }

  const saved = await prisma.socialMediaStat.upsert({
    where: { platform_periodLabel: { platform: body.platform, periodLabel: body.periodLabel } },
    update: {
      followers: body.followers,
      impressions: body.impressions,
      likes: body.likes,
      views: body.views,
      listGrowth: body.listGrowth,
      source: "webhook",
    },
    create: {
      platform: body.platform,
      periodLabel: body.periodLabel,
      followers: body.followers,
      impressions: body.impressions,
      likes: body.likes,
      views: body.views,
      listGrowth: body.listGrowth,
      source: "webhook",
    },
  });

  return NextResponse.json({ ok: true, id: saved.id });
}
