import { ProfileType } from '@/app/types/shared';
import {
  AutoPaginatable,
  OrganizationMembership,
  User,
  WorkOS,
} from '@workos-inc/node';
import mongoose, { model, models, Schema } from 'mongoose';

export type Job = {
  profileType: ProfileType;
  orgName?: string;
  _id: string;
  title: string;
  weight: string;
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
  isAdmin?: boolean;
  urgency: string;
  vehicleType: string;
  vehicleSize: string;
  jobDate: Date;
};

const JobSchema = new Schema(
  {
    profileType: {
      type: String,
      enum: ['company', 'chauffeur'],
      required: true,
    },
    title: { type: String, required: true },
    weight: { type: String, required: true },
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
    isAdmin: { type: Boolean, default: false },
    urgency: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleSize: { type: String, required: true },
    jobDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// // TTL index to automatically delete jobs after 7 days (7 * 24 * 60 * 60 = 604800 seconds)
// JobSchema.index({ jobDate: 1 }, { expireAfterSeconds: 600000 }); // 7 days in seconds

export const JobModel = models?.Job || model('Job', JobSchema);

export async function addOrgAndUserData(jobsInfo: Job[], user: User | null) {
  jobsInfo = JSON.parse(JSON.stringify(jobsInfo));
  await mongoose.connect(process.env.MONGO_URI as string);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  let oms: AutoPaginatable<OrganizationMembership> | null = null;
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user?.id,
    });
  }
  for (const job of jobsInfo) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find((om) => om.organizationId === job.orgId);
    }
  }
  return jobsInfo;
}
