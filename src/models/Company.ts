import { ProfileType } from '@/app/types/shared';
import { Document, Schema, model, models } from 'mongoose';

export interface Company extends Document {
  profileType: ProfileType;
  newCompanyName: string;
  newCompanyContactName: string;
  newCompanyPhone: string;
  newCompanyEmail: string;
  newCompanyLocation: string;
  newCompanyWebsite?: string;
  newCompanySocialFacebook?: string;
  organizationId: string;
  createdBy: string;
}

const CompanySchema = new Schema<Company>({
  profileType: {
    type: String,
    enum: ['company', 'chauffeur'],
    default: 'company',
    required: true,
  },
  newCompanyName: { type: String, required: true },
  newCompanyContactName: { type: String, required: true },
  newCompanyPhone: { type: String, required: true },
  newCompanyEmail: { type: String, required: true },
  newCompanyLocation: { type: String, required: true },
  newCompanyWebsite: { type: String },
  newCompanySocialFacebook: { type: String },
  organizationId: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export const CompanyModel =
  models.Company || model<Company>('Company', CompanySchema, 'companies');
