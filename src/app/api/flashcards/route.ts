import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import Flashcard from "@/models/Flashcard";
import { authOptions } from "@/lib/auth";


export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions); 

        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        // TODO: find flashcards related to set
        const flashcards = await Flashcard.find();
        
        return NextResponse.json({ flashcards }, { status: 200 });
    } catch (error) {
        console.error("Error fetching flashcards:", error);
        return NextResponse.json(
            { message: "Failed to fetch flashcards"},
            { status: 500 },
        );
    }
}