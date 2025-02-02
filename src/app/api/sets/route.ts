import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Set from "@/models/Sets";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";


// POST /api/sets
export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { title, description, cards } = body;

        // Basic validation
        if (!title || cards.length === 0) {
            return NextResponse.json(
                { message: "Title and at least one card are required." },
                { status: 400 }
            );
        }

        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        console.log("Session:", session);

        // Create new set
        const newSet = new Set({
            title,
            description,
            cards,
            user: userId,
        });

        await newSet.save();

        return NextResponse.json(
            { message: "Set created successfully!", newSet, }, {status: 201});
    } catch (error) {
        console.error("Error creating set:", error);
        return NextResponse.json(
            { message: "Failed to create set:", error},
            { status: 500 }
        );
    }
}