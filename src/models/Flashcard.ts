import mongoose, { Schema, model, Document } from "mongoose";

export interface FlashcardDocument extends Document {
    question: string;
    answer: string;
    set: mongoose.Types.ObjectId; // Reference to the parent set
    createdAt: Date;
    updatedAt: Date;
}

const flashcardSchema = new Schema<FlashcardDocument>(
    {
      question: {
        type: String,
        required: [true, "Question is required"],
      },
      answer: {
        type: String,
        required: [true, "Answer is required"],
      },
      set: {
        type: Schema.Types.ObjectId,
        ref: "Set",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Flashcard =
    mongoose.models?.Flashcard || model<FlashcardDocument>("Flashcard", flashcardSchema);
  export default Flashcard;
        