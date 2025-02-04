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
                { status: 400 }
            );
        }

        const flashcards = await Flashcard.find({ set: setId });
        
        return NextResponse.json({ flashcards }, { status: 200 });
    } catch (error) {
        console.error("Error fetching flashcards:", error);
        return NextResponse.json(
            { message: "Failed to fetch flashcards"},
            { status: 500 },
        );
    }
}