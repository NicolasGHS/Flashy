"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";


export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/flashcards");
  };

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      )
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      )
    }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-xs">
        <p className="mb-4 text-lg font-medium">Start</p>
        <Button variant="outline" onClick={handleNavigation}>
          Button
        </Button>
      </div>
    </div>
  );
  };
}
