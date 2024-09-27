import { withAuth } from "@workos-inc/authkit-nextjs";
import { createCompany } from "../actions/workosActions";

export default async function NewCompanyPage() {
  const { user } = await withAuth();
  async function handleNewCompanyFormSubmit(data: FormData) {
    "use server";
    if (user) {
      await createCompany(data.get("newCompanyName") as string, user.id);
    }
  }

  if (!user) {
    <h1>Login to use this page</h1>;
  }

  return (
    <div className="container">
      <h2 className="text-lg mt-6">Yeni bir şirket oluştur</h2>
      <p className="text-gray-500 text-sm mb-2">
        Bir iş ilanı oluşturmak için şirketinizi oluşturun
      </p>
      <form action={handleNewCompanyFormSubmit} className="flex gap-2">
        <input
          name="newCompanyName"
          type="text"
          placeholder="Şirket ismi gir"
          className="p-2 border border-gray-400 rounded-md"
        />
        <button
          type="submit"
          className="flex gap-2 items-center bg-orange-400 px-4 py-2 rounded-md text-white"
        >
          Şirket oluştur
        </button>
      </form>
    </div>
  );
}
