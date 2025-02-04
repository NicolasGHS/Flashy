import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Set from "@/models/Set";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectDB();
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const setId = params.id;
      const userId = session.user.id;
  
      const set = await Set.find({ _id: setId, user: userId });

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