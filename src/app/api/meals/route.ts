import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get('userId');

    console.log(userId);

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 5);

    await prisma.mealPlan.deleteMany({
      where: {
        userId,
        date: {
          lt: today,
        },
      },
    });

    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        userId,
        date: {
          gte: today,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        recipe: true,
      },
    });

    const adjustedMealPlans = mealPlans.map((plan) => ({
      ...plan,
      date: new Date(new Date(plan.date).setDate(new Date(plan.date).getDate() + 1)),
    }));


    console.log (mealPlans);

    return NextResponse.json({ mealPlans: adjustedMealPlans });
  } catch (error) {
    console.error('GET /meal-plan error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, mealType, userId, recipeId } = body;

    console.log ("works")

    if (!date || !mealType || !userId || !recipeId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed
    parsedDate.setHours(0, 0, 0, 0); // Explicitly set time to midnight


    console.log ("works")

    const mealPlan = await prisma.mealPlan.upsert({
      where: {
        date_mealType_userId: {
          date: parsedDate,
          mealType,
          userId,
        },
      },
      update: {
        recipeId,
      },
      create: {
        date: parsedDate,
        mealType,
        userId,
        recipeId,
      },
    });

    return NextResponse.json({ success: true, mealPlan });
  } catch (error) {
    console.error('POST /meal-plan error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
