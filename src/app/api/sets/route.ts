import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Set from "@/models/Set";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const sets = await Set.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ sets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sets:", error);
    return NextResponse.json(
      { message: "Failed to fetch sets" },
      { status: 500 },
    );
  }
}

// POST /api/sets
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description } = body;

    // Basic validation
    if (!title ) {
      return NextResponse.json(
        { message: "Title and at least one card are required." },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log("Session:", session);

    // Create new set
    // TODO: refactor way to add cards with model
    const newSet = new Set({
      title,
      description,
      user: userId,
    });

    await newSet.save();

    return NextResponse.json(
      { message: "Set created successfully!", newSet },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating set:", error);
    return NextResponse.json(
      { message: "Failed to create set:", error },
      { status: 500 },
    );
  }
}
