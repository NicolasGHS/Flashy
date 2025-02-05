import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import Flashcard from "@/models/Flashcard";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const setId = searchParams.get("setId");

    if (!setId) {
      return NextResponse.json(
        { message: "SetId query parameter is required." },
        { status: 400 },
      );
    }

    const flashcards = await Flashcard.find({ set: setId });

    return NextResponse.json({ flashcards }, { status: 200 });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { message: "Failed to fetch flashcards" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { question, answer, set } = body;

    // Validation
    if (!question || !answer || !set) {
      return NextResponse.json(
        { message: "Question, answer, and set are required." },
        { status: 400 },
      );
    }

    const userSet = await Set.findOne({ _id: set, user: session.user.id });
    if (!userSet) {
      return NextResponse.json(
        { message: "Set not found or you do not have permission." },
        { status: 404 },
      );
    }

    const newFlashcard = new Flashcard({
      question,
      answer,
      set,
    });

    await newFlashcard.save();

    return NextResponse.json(
      { message: "Flashcard created successfully!", newFlashcard },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create flashcards:", error },
      { status: 500 },
    );
  }
}
