import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipeId, favourite } = body;

    if (!recipeId || typeof favourite !== "boolean") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: { favourite },
    });

    return NextResponse.json({ success: true, recipe: updatedRecipe });
  } catch (error) {
    console.error("Error toggling favourite:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
