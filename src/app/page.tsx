"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/flashcards");
  };

  return (
    <div>
      <p>Start</p>
      <Button variant="outline" onClick={handleNavigation}>
        Button
      </Button>
    </div>
  );
}
