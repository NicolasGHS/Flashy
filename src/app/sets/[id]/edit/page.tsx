"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";

const EditSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const router = useRouter();

  console.log("Title: ", title);
  console.log("Id: ", id);

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const response = await fetch(`/api/sets/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTitle(data.set.title || "");
          setDescription(data.set.description || "");
        } else {
          console.error("Failed to fetch set.");
        }
      } catch (error) {
        console.error("Error fetching set:", error); 
      }
    };

    fetchSet();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/sets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        alert("Set updated successfully!");
        router.push(`/sets/${id}`); // Redirect back to sets page
      } else {
        alert("Failed to update set.");
      }
    } catch (error) {
      console.error("Error updating set:", error);
      alert("An error occurred while updating the set.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Flashcard Set</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          placeholder="Set Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-center">
          <Button type="submit" variant="outline">
            Update Set
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSet;
