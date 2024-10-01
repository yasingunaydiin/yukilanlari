"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import TransportCategories from "@/app/new-listing/[orgId]/TransportCategories";
import { SetStateAction, useState } from "react";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/jobActions";
import "react-country-state-city/dist/react-country-state-city.css";
import { CountrySelect, StateSelect } from "react-country-state-city";

export function JobForm({ orgId }: { orgId: string }) {
  const [countryId, setCountryId] = useState(0);
  const [, setStateId] = useState(0);
  const [countryFromName, setCountryFromName] = useState("");
  const [stateFromName, setStateFromName] = useState("");
  const [countryToName, setCountryToName] = useState("");
  const [stateToName, setStateToName] = useState("");

  async function handleSaveJob(data: FormData) {
    data.set("countryFrom", countryFromName.toString());
    data.set("stateFrom", stateFromName.toString());
    data.set("countryTo", countryToName.toString());
    data.set("stateTo", stateToName.toString());
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
              <Input name="contact-name" placeholder="İsim" />
              <Input name="contact-email" placeholder="E-mail" />
              <Input name="contact-number" placeholder="Telefon Numarası" />
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
                  onChange={(e: {
                    id: SetStateAction<number>;
                    name: SetStateAction<string>;
                  }) => {
                    setCountryId(e.id);
                    setCountryFromName(e.name);
                  }}
                  placeHolder="Ülke Seç"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>Nereye</Label>
                <CountrySelect
                  onChange={(e: {
                    id: SetStateAction<number>;
                    name: SetStateAction<string>;
                  }) => {
                    setCountryId(e.id);
                    setCountryToName(e.name);
                  }}
                  placeHolder="Ülke Seç"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label>Nereden</Label>
                <StateSelect
                  countryid={countryId}
                  onChange={(e: {
                    id: SetStateAction<number>;
                    name: SetStateAction<string>;
                  }) => {
                    setStateId(e.id);
                    setStateFromName(e.name);
                  }}
                  placeHolder="Şehir Seç"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label>Nereye</Label>
                <StateSelect
                  countryid={countryId}
                  onChange={(e: {
                    id: SetStateAction<number>;
                    name: SetStateAction<string>;
                  }) => {
                    setStateId(e.id);
                    setStateToName(e.name);
                  }}
                  placeHolder="Şehir Seç"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center p-4">
        <Button>Kaydet</Button>
      </div>
    </form>
  );
}
