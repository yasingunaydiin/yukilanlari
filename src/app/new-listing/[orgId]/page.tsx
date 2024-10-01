import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { JobForm } from "@/app/components/JobForm";
import "react-country-state-city/dist/react-country-state-city.css";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListingForOrgPage(props: PageProps) {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) return "Lütfen giriş yapın";
  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;

  if (!hasAccess) {
    return "erişim yok";
  }

  return <JobForm orgId={orgId} />;
}
