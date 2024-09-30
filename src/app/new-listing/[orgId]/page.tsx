import { Card, CardContent } from "@/app/components/ui/card";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { countries } from "countries-list";

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

  // Filter to get only European countries
  const europeanCountries = Object.entries(countries)
    .filter(([code, country]) => country.continent === "EU")
    .map(([code, country]) => ({
      code: code.toLowerCase(),
      name: country.name,
    }));

  return (
    <form action="" className="container mt-6">
      <Card>
        <CardContent className="flex flex-col gap-4 p-5">
          <Input placeholder="Job title" />

          <Textarea placeholder="Job description" />
          <div className="space-y-4">
            <div className="flex flex-row space-x-2 items-center">
              <Label htmlFor="country-from">Nereden</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Başlangıç ülkeni seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Countries</SelectLabel>
                    <SelectItem value="tr">Turkey</SelectItem>
                    {europeanCountries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label htmlFor="country-to">Nereye</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Başlangıç ülkeni seç" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Countries</SelectLabel>
                    <SelectItem value="tr">Turkey</SelectItem>
                    {europeanCountries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Cities</SelectLabel>
                    <SelectItem value="nyc">New York City</SelectItem>
                    <SelectItem value="la">Los Angeles</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="tokyo">Tokyo</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>All Cities</SelectLabel>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="sydney">Sydney</SelectItem>
                    <SelectItem value="berlin">Berlin</SelectItem>
                    <SelectItem value="moscow">Moscow</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label htmlFor="city">City</Label>
              <Select>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Cities</SelectLabel>
                    <SelectItem value="nyc">New York City</SelectItem>
                    <SelectItem value="la">Los Angeles</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="tokyo">Tokyo</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>All Cities</SelectLabel>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="sydney">Sydney</SelectItem>
                    <SelectItem value="berlin">Berlin</SelectItem>
                    <SelectItem value="moscow">Moscow</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
