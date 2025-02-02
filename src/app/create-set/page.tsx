"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateCard = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cards, setCards] = useState([{ question: "", answer: "" }]);

    const handleCardChange = (index: number, field: string, value: string) => {
        const updateCards = [...cards];
        updateCards[index][field] = value;
        setCards(updateCards);
    };

    const addCard = () => {
        setCards([...cards, { question: "", answer: "" }]);
    }

    const removeCard = (index: number) => {
        setCards(cards.filter((_, i) => i !== index));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newSet = {
            title,
            description,
            cards,
        };

        try {
            const response = await fetch("/api/sets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSet),
            });

            if (response.ok) {
                alert("Set created successfully!");
                setTitle("");
                setDescription("");
                setCards([{ question: "", answer: "" }]);
            } else {
                alert("Failed to create set.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while creating the set.");
        }
    }
    
    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Flashcard Set</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Set Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          placeholder="Set Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h2 className="text-xl font-semibold">Cards</h2>

        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 border rounded-md bg-gray-50 relative"
          >
            <Input
              type="text"
              placeholder="Question"
              value={card.question}
              onChange={(e) => handleCardChange(index, "question", e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Answer"
              value={card.answer}
              onChange={(e) => handleCardChange(index, "answer", e.target.value)}
              required
            />

            {cards.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                className="mt-2"
                onClick={() => removeCard(index)}
              >
                Remove Card
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={addCard}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          + Add Another Card
        </Button>

        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
          Create Set
        </Button>
      </form>
    </div>
    )
}

export default CreateCard;