"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";

const EditSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const { id } = useParams();
  const router = useRouter();


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

    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`/api/flashcards?setId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFlashcards(data.flashcards || []);
        } else {
          console.error("Failed to fetch flashcards.");
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchSet();
    fetchFlashcards();
  }, [id]);

  // TODO: merge 2 handles into 1

  const handleFlashcardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/flashcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          set: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFlashcards((prev) => [...prev, data.newFlashcard]); // Voeg de nieuwe flashcard toe aan de lijst
        setNewQuestion(""); // Reset de vraag
        setNewAnswer(""); // Reset het antwoord
        alert("Flashcard added successfully!");
      } else {
        alert("Failed to add flashcard.");
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
      alert("An error occurred while adding the flashcard.");
    }
  };

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
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Set</h1>

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
      <div className="space-y-4 mt-4">
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
            <div key={flashcard._id} className="border p-4 rounded-lg">
              <p><strong>Question:</strong> {flashcard.question}</p>
              <p><strong>Answer:</strong> {flashcard.answer}</p>
            </div>
          ))
        ) : (
          <p>No flashcards found for this set.</p>
        )}
      </div>

      <form onSubmit={handleFlashcardSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          required
        />

        <Textarea
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          required
        />

        <div className="flex justify-center">
          <Button type="submit" variant="outline">
            Add Flashcard
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSet;
