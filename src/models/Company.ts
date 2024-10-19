import { Document, Schema, model, models } from 'mongoose';

export interface Company extends Document {
  newCompanyName: string;
  newCompanyContactName: string;
  newCompanyPhone: string;
  newCompanyEmail: string;
  newCompanyLocation: string;
  newCompanyWebsite?: string;
  newCompanySocialFacebook?: string;
  organizationId: string;
  createdBy: string; // Add this field to track the user who created the organization
}

const CompanySchema = new Schema<Company>({
  newCompanyName: { type: String, required: true },
  newCompanyContactName: { type: String, required: true },
  newCompanyPhone: { type: String, required: true },
  newCompanyEmail: { type: String, required: true },
  newCompanyLocation: { type: String, required: true },
  newCompanyWebsite: { type: String },
  newCompanySocialFacebook: { type: String },
  organizationId: { type: String, required: true },
  createdBy: { type: String, required: true }, // Track by user ID
});

// Check if the model already exists in the `models` collection
export const CompanyModel =
  models.Company || model<Company>('Company', CompanySchema, 'companies');
