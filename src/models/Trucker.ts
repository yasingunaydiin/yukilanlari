import { Document, Schema, model, models } from 'mongoose';

export interface Trucker extends Document {
  newTruckerContactName: string;
  newTruckerPhone: string;
  newTruckerEmail: string;
  newTruckerLocation: string;
  newTruckerWebsite?: string;
  newTruckerSocialFacebook?: string;
  truckerId: string; // Add this field
}

const TruckerSchema = new Schema<Trucker>({
  newTruckerContactName: { type: String, required: true },
  newTruckerPhone: { type: String, required: true },
  newTruckerEmail: { type: String, required: true },
  newTruckerLocation: { type: String, required: true },
  newTruckerWebsite: { type: String },
  newTruckerSocialFacebook: { type: String },
  truckerId: { type: String, required: true }, // Include the truckerId field
});

// Check if the model already exists in the `models` collection
export const TruckerModel =
  models.Trucker || model<Trucker>('Trucker', TruckerSchema, 'truckers');
