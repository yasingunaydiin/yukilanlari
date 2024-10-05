import { model, models, Schema } from 'mongoose';

export type Job = {
  orgName?: string;
  _id: string;
  title: string;
  tonaj: string;
  countryFrom: string;
  countryTo: string;
  cityFrom: string;
  cityTo: string;
  emoji: string;
  category: string;
  orgId: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
};

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    tonaj: { type: String, required: true },
    countryFrom: { type: String, required: true },
    countryTo: { type: String, required: true },
    cityFrom: { type: String, required: true },
    cityTo: { type: String, required: true },
    emoji: { type: String },
    category: { type: String, required: true },
    orgId: { type: String, required: true },
    description: { type: String, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const JobModel = models?.Job || model('Job', JobSchema);
