"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sets = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/create-set");
  };

  return (
    <div className="flex flex-col items-center">

      <p>Sets</p>
      <Button onClick={handleNavigation}>Create a Set</Button>
    </div>
  );
};

export default Sets;
