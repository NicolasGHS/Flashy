"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/flashcards");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full max-w-xs">
        <p className="mb-4 text-lg font-medium">Start</p>
        <Button variant="outline" onClick={handleNavigation}>
          Button
        </Button>
      </div>
    </div>
  );
}
