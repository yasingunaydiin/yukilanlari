import { withAuth } from "@workos-inc/authkit-nextjs";
import { createCompany } from "@/app/actions/workosActions";
import { redirect } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default async function NewCompanyPage() {
  const { user } = await withAuth();

  if (!user) {
    redirect("/login");
  }

  async function handleNewCompanyFormSubmit(formData: FormData) {
    "use server";
    const newCompanyName = formData.get("newCompanyName") as string;
    if (newCompanyName) {
      await createCompany(newCompanyName, user.id);
      redirect("/new-listing");
    }
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Yeni bir şirket oluştur</CardTitle>
          <CardDescription>
            Bir iş ilanı oluşturmak için şirketinizi oluşturun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleNewCompanyFormSubmit} className="space-y-4">
            <Input
              name="newCompanyName"
              type="text"
              placeholder="Şirket ismi gir"
              required
            />
            <Button type="submit" className="w-full">
              Şirket oluştur
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
