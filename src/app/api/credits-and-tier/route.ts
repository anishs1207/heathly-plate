import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log({
      credits: user.credits,
      tierPlan: user.tierPlan,
    });

    return NextResponse.json({
      credits: user.credits,
      tierPlan: user.tierPlan,
    });
  } catch (error) {
    console.error("Error at /api/credits-and-tier", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
