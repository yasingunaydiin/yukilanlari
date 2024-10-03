import { model, models, Schema } from "mongoose";

const JobSchema = new Schema({
  title: { type: String, required: true },
  tonaj: { type: String, required: true },
  countryFrom: { type: String, required: true },
  countryTo: { type: String, required: true },
  cityFrom: { type: String, required: true },
  cityTo: { type: String, required: true },
  emoji: { type: String }, //to call the emoji to the front page. But i havent added this anywhere.... idk where
  category: { type: String, required: true },
  orgId: { type: String, required: true },
  description: { type: String, required: true },
  contactName: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
});

export const JobModel = models?.Job || model("Job", JobSchema);
