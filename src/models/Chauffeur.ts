import { ProfileType } from '@/app/types/shared';
import { Document, Schema, model, models } from 'mongoose';

export interface Chauffeur extends Document {
  profileType: ProfileType;
  newChauffeurName: string;
  newChauffeurContactName: string;
  newChauffeurPhone: string;
  newChauffeurEmail: string;
  newChauffeurLocation: string;
  newChauffeurWebsite?: string;
  newChauffeurSocialFacebook?: string;
  chauffeurId: string;
  createdBy: string;
}

const ChauffeurSchema = new Schema<Chauffeur>({
  profileType: {
    type: String,
    enum: ['company', 'chauffeur'],
    default: 'chauffeur',
    required: true,
  },
  newChauffeurName: { type: String, required: true },
  newChauffeurContactName: { type: String, required: true },
  newChauffeurPhone: { type: String, required: true },
  newChauffeurEmail: { type: String, required: true },
  newChauffeurLocation: { type: String, required: true },
  newChauffeurWebsite: { type: String },
  newChauffeurSocialFacebook: { type: String },
  chauffeurId: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export const ChauffeurModel =
  models.Chauffeur ||
  model<Chauffeur>('Chauffeur', ChauffeurSchema, 'chauffeur');
