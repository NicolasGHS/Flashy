import mongoose, { Schema, model, Document} from "mongoose";

export interface SetDocument extends Document {
  title: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const setSchema = new Schema<SetDocument>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Exporting the model
const Set = mongoose.models?.Set || model<SetDocument>("Set", setSchema);
export default Set;