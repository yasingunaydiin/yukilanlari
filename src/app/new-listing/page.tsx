"use server";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";

export default async function NewListingPage() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const { user } = await withAuth(); //getUser();

  if (!user) {
    return (
      <div className="container mt-6">İş ilanı vermek için giriş yapın</div>
    );
  }

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === "active"
  );

  const organizationsNames: { [key: string]: string } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  return (
    <div className="container">
      <div>
        <h1 className="text-lg mt-6">Şirketleriniz</h1>
        <p className="text-gray-500 text-sm mb-2">
          İş oluşturmak için bir şirket seçin
        </p>
        <div>
          <div className="border inline-block rounded-md">
            {Object.keys(organizationsNames).map((orgId) => (
              // eslint-disable-next-line react/jsx-key
              <Link
                href={"/new-listing/" + orgId}
                className={
                  "py-2 px-4 flex gap-2 items-center " +
                  (Object.keys(organizationsNames)[0] === orgId
                    ? ""
                    : "border-t")
                }
              >
                {organizationsNames[orgId]}
                <FontAwesomeIcon className="h-4" icon={faArrowRight} />
              </Link>
            ))}
          </div>
        </div>

        {organizationMemberships.data.length === 0 && (
          <div className="border border-yellow-400 bg-yellow-50 p-4 rounded-md">
            Kullanıcınıza atanmış şirket bulunmuyor
          </div>
        )}

        <Link
          href={"/new-company"}
          className="inline-flex gap-2 items-center bg-orange-400 text-white px-4 py-2 rounded-md mt-6"
        >
          Şirket oluştur
          <FontAwesomeIcon className="h-4" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}
