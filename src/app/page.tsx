"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch(`/api/sets`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setSets(data.sets);
        } else {
          console.error("Failed to fetch sets");
        }
        
      } catch (error) {
        console.error("Failed to fetch sets:", error); 
      }
    } 

    fetchSets();
  }, []);


  const handleNavigation = () => {
    router.push("/flashcards");
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <Label className="text-lg">Folders</Label>
      </div>
      <div>
        <Label className="text-lg">Sets</Label>
      </div>
    </div>
  );
};

