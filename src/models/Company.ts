import { Document, Schema, model, models } from 'mongoose';

export interface Company extends Document {
  newCompanyContactName: string;
  newCompanyPhone: string;
  newCompanyEmail: string;
  newCompanyLocation: string;
  newCompanyWebsite?: string;
  newCompanySocialFacebook?: string;
  organizationId: string; // Add this field
}

const CompanySchema = new Schema<Company>({
  newCompanyContactName: { type: String, required: true },
  newCompanyPhone: { type: String, required: true },
  newCompanyEmail: { type: String, required: true },
  newCompanyLocation: { type: String, required: true },
  newCompanyWebsite: { type: String },
  newCompanySocialFacebook: { type: String },
  organizationId: { type: String, required: true }, // Include the organizationId field
});

// Check if the model already exists in the `models` collection
export const CompanyModel =
  models.Company || model<Company>('Company', CompanySchema, 'companies');
