import { model, models, Schema } from "mongoose";

const JobSchema = new Schema({
  title: { type: String, required: true },
  tonaj: { type: String, required: true },
  countryFrom: { type: String, required: true },
  countryTo: { type: String, required: true },
  stateFrom: { type: String, required: true },
  stateTo: { type: String, required: true },
  emoji: { type: String }, //to call the emoji to the front page. But i havent added this anywhere.... idk where
  category: { type: String, required: true },
  orgId: { type: String, required: true },
  contactPerson: new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  }),
});

export const JobModel = models?.Job || model("Job", JobSchema);
