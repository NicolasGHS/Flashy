import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Set from "@/models/Set";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const setId = url.pathname.split("/").pop();
    const userId = session.user.id;

    const set = await Set.findOne({ _id: setId, user: userId });

    if (!set) {
      return NextResponse.json({ message: "Set not found" }, { status: 404 });
    }

    return NextResponse.json({ set }, { status: 200 });
  } catch (error) {
    console.error("Error fetching set:", error);
    return NextResponse.json(
      { message: "Failed to fetch set" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const setId = params.id;
    const userId = session.user.id;

    // Parse updated data from request body
    const body = await req.json();
    const { title, description } = body;

    // Basic validation
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    // Find and update the set
    const updatedSet = await Set.findOneAndUpdate(
      { _id: setId, user: userId }, // Ensure the user owns the set
      { title, description },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedSet) {
      return NextResponse.json({ message: "Set not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Set updated successfully!", updatedSet },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating set:", error);
    return NextResponse.json(
      { message: "Failed to update set" },
      { status: 500 }
    );
  }
}