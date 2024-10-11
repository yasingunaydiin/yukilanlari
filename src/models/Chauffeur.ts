import { Document, Schema, model, models } from 'mongoose';

export interface Chauffeur extends Document {
  newChauffeurContactName: string;
  newChauffeurPhone: string;
  newChauffeurEmail: string;
  newChauffeurLocation: string;
  newChauffeurWebsite?: string;
  newChauffeurSocialFacebook?: string;
  chauffeurId: string;
}

const ChauffeurSchema = new Schema<Chauffeur>({
  newChauffeurContactName: { type: String, required: true },
  newChauffeurPhone: { type: String, required: true },
  newChauffeurEmail: { type: String, required: true },
  newChauffeurLocation: { type: String, required: true },
  newChauffeurWebsite: { type: String },
  newChauffeurSocialFacebook: { type: String },
  chauffeurId: { type: String, required: true },
});

// Check if the model already exists in the `models` collection
export const ChauffeurModel =
  models.Chauffeur ||
  model<Chauffeur>('Chauffeur', ChauffeurSchema, 'chauffeur');
