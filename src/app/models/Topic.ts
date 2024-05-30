import { Schema, model } from "mongoose";
interface Topic {
  name: string;
}

const TopicSchema = new Schema({
  name: String,
});

export const Topic = model("Topic", TopicSchema);
