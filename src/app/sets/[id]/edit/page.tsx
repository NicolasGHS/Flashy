"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EditSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="max-w-xl mx-auto p-4b shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create Flashcard Set
      </h1>

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
        <div className="flex justify-center">
          <Button type="submit" variant="outline">
            Create Set
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSet;
