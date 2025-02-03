"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

const Sets = () => {
  const [sets, setSets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch("/api/sets", {
          method: "GET",
        });
        console.log("response:", response);

        if (response.ok) {
          const data = await response.json();
          setSets(data.sets);
        } else {
          console.error("Failed to fetch sets");
        }
      } catch (error) {
        console.error("Error fetching sets:", error);
      }
    };

    fetchSets();
  }, []);

  const handleNavigation = () => {
    router.push("/create-set");
  };

  return (
    <div className="flex flex-col items-center">
      <p>Sets</p>

      {sets.length === 0 ? (
        <p className="text-center">No sets found.</p>
      ) : (
        sets.map((set) => (
          <Card key={set._id} className="mb-4 shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{set.title}</h2>
              <p className="text-gray-600">{set.description}</p>
              <p className="text-sm text-gray-400">{set.cards.length} cards</p>
            </CardContent>
          </Card>
        ))
      )}

      <Button onClick={handleNavigation}>Create a Set</Button>
    </div>
  );
};

export default Sets;
