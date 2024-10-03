"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import TransportCategories from "@/app/new-listing/[orgId]/TransportCategories";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/jobActions";
import CountrySelect from "@/app/new-listing/[orgId]/EuropeanCountries";
import CitySelect from "@/app/new-listing/[orgId]/EuropeanCities";
import { useState } from "react";

export function JobForm({ orgId }: { orgId: string }) {
  const [countryFrom, setCountryFrom] = useState<string | undefined>();
  const [countryTo, setCountryTo] = useState<string | undefined>();
  const [selectedCountryId, setSelectedCountryId] = useState<
    number | undefined
  >();
  const [cityFrom, setCityFrom] = useState<string | undefined>();
  const [cityTo, setCityTo] = useState<string | undefined>();

  async function handleSaveJob(data: FormData) {
    data.set("countryFrom", countryFrom ?? "");
    data.set("cityFrom", cityFrom ?? ""); // Ensure you are saving the city here
    data.set("countryTo", countryTo ?? "");
    data.set("cityTo", cityTo ?? ""); // Ensure you are saving the city here
    data.set("orgId", orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }

  return (
    <form action={handleSaveJob} className="container mt-6">
      <Card>
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="space-y-2">
            <Label>İletişim</Label>
            <div className="flex gap-4">
              <Input name="contactName" placeholder="İsim" />
              <Input name="contactEmail" type="email" placeholder="E-mail" />
              <Input
                name="contactPhone"
                type="tel"
                placeholder="Telefon Numarası"
              />
            </div>
          </div>
          <Input name="title" placeholder="Başlık" />
          <Input name="tonaj" placeholder="Tonaj" />
          <TransportCategories />
          <Textarea name="description" placeholder="Açıklama" />

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label>Nereden</Label>
                <CountrySelect
                  setCountry={(countryName) => {
                    setCountryFrom(countryName);
                    setSelectedCountryId(225); // Assuming Turkey ID is 225
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>Nereden</Label>
                <CountrySelect
                  setCountry={(countryName) => {
                    setCountryTo(countryName);
                    setSelectedCountryId(225); // Assuming Turkey ID is 225
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label>Şehir</Label>
                <CitySelect
                  selectedCountryId={selectedCountryId}
                  setCity={setCityFrom}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>Şehir</Label>
                <CitySelect
                  selectedCountryId={selectedCountryId}
                  setCity={setCityTo}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center p-4">
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
}
