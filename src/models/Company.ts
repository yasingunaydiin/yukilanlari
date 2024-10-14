import { Document, Schema, model, models } from 'mongoose';

export interface Company extends Document {
  newCompanyContactName: string;
  newCompanyPhone: string;
  newCompanyEmail: string;
  newCompanyLocation: string;
  newCompanyWebsite?: string;
  newCompanySocialFacebook?: string;
  organizationId: string;
  createdBy: Schema.Types.ObjectId; // Reference the User's ObjectId
}

const CompanySchema = new Schema<Company>({
  newCompanyContactName: { type: String, required: true },
  newCompanyPhone: { type: String, required: true },
  newCompanyEmail: { type: String, required: true },
  newCompanyLocation: { type: String, required: true },
  newCompanyWebsite: { type: String },
  newCompanySocialFacebook: { type: String },
  organizationId: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Track user ID
});

export const CompanyModel =
  models.Company || model<Company>('Company', CompanySchema, 'companies');
