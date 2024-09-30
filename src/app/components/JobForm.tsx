"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
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
import useCities from "turkey-cities-towns";
import EuropeanCapitals from "@/app/new-listing/[orgId]/EuropeanCapitals";
import EuropeanCountries from "@/app/new-listing/[orgId]/EuropeanCountries";
import TransportCategories from "@/app/new-listing/[orgId]/TransportCategories";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { cities } = useCities();

function saveJob(data: FormData, countryId: string, cityId: number) {
  data.set("countryId", countryId.toString());
  data.set("cityId", cityId.toString());
}

export function JobForm() {
  return (
    <form action={saveJob} className="container mt-6">
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
              <div className="flex flex-col gap-2">
                <Label>Nereden</Label>
                <Select>
                  <SelectTrigger name="country-from" className="w-[300px]">
                    <SelectValue placeholder="Başlangıç ülkeni seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popüler Ülkeler</SelectLabel>
                      <SelectItem value="tr">🇹🇷 Türkiye</SelectItem>
                    </SelectGroup>
                    <EuropeanCountries />
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Nereye</Label>
                <Select>
                  <SelectTrigger name="country-to" className="w-[300px]">
                    <SelectValue placeholder="Varış ülkeni seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popüler Ülkeler</SelectLabel>
                      <SelectItem value="tr">🇹🇷 Türkiye</SelectItem>
                    </SelectGroup>
                    <EuropeanCountries />
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nereden</Label>
                <Select>
                  <SelectTrigger name="city-from" className="w-[300px]">
                    <SelectValue placeholder="Başlangıç şehiri seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popüler Şehirler</SelectLabel>
                      <SelectItem value="istanbul">Istanbul</SelectItem>
                      <SelectItem value="ankara">Ankara</SelectItem>
                      <SelectItem value="izmir">Izmir</SelectItem>
                      <SelectItem value="bursa">Bursa</SelectItem>
                      <SelectItem value="antalya">Antalya</SelectItem>
                      <SelectItem value="konya">Konya</SelectItem>
                      <SelectItem value="adana">Adana</SelectItem>
                      <SelectItem value="sanliurfa">Şanlıurfa</SelectItem>
                      <SelectItem value="gaziantep">Gaziantep</SelectItem>
                      <SelectItem value="kocaeli">Kocaeli</SelectItem>
                      <SelectItem value="mersin">Mersin</SelectItem>
                      <SelectItem value="diyarbakir">Diyarbakır</SelectItem>
                      <SelectItem value="hatay">Hatay</SelectItem>
                      <SelectItem value="kayseri">Kayseri</SelectItem>
                      <SelectItem value="samsun">Samsun</SelectItem>
                      <SelectItem value="balikesir">Balıkesir</SelectItem>
                      <SelectItem value="tekirdag">Tekirdağ</SelectItem>
                      <SelectItem value="aydin">Aydın</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                    </SelectGroup>

                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Tüm Şehirler</SelectLabel>
                      {cities.map((city: { plate: number; name: string }) => (
                        <SelectItem key={city.plate} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <EuropeanCapitals />
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Nereye</Label>
                <Select>
                  <SelectTrigger name="city-to" className="w-[300px]">
                    <SelectValue placeholder="Başlangıç şehiri seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popüler Şehirler</SelectLabel>
                      <SelectItem value="istanbul">Istanbul</SelectItem>
                      <SelectItem value="ankara">Ankara</SelectItem>
                      <SelectItem value="izmir">Izmir</SelectItem>
                      <SelectItem value="bursa">Bursa</SelectItem>
                      <SelectItem value="antalya">Antalya</SelectItem>
                      <SelectItem value="konya">Konya</SelectItem>
                      <SelectItem value="adana">Adana</SelectItem>
                      <SelectItem value="sanliurfa">Şanlıurfa</SelectItem>
                      <SelectItem value="gaziantep">Gaziantep</SelectItem>
                      <SelectItem value="kocaeli">Kocaeli</SelectItem>
                      <SelectItem value="mersin">Mersin</SelectItem>
                      <SelectItem value="diyarbakir">Diyarbakır</SelectItem>
                      <SelectItem value="hatay">Hatay</SelectItem>
                      <SelectItem value="kayseri">Kayseri</SelectItem>
                      <SelectItem value="samsun">Samsun</SelectItem>
                      <SelectItem value="balikesir">Balıkesir</SelectItem>
                      <SelectItem value="tekirdag">Tekirdağ</SelectItem>
                      <SelectItem value="aydin">Aydın</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                    </SelectGroup>

                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Tüm Şehirler</SelectLabel>
                      {cities.map((city: { plate: number; name: string }) => (
                        <SelectItem key={city.plate} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <EuropeanCapitals />
                  </SelectContent>
                </Select>
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
