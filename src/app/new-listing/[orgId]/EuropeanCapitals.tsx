import {
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/app/components/ui/select";
import { useState } from "react";

const europeanCapitals = [
  { code: "AL", value: "Tirana", name: "Tirana", flag: "🇦🇱" }, // Albania
  {
    code: "AD",
    value: "Andorra la Vella",
    name: "Andorra la Vella",
    flag: "🇦🇩",
  }, // Andorra
  { code: "AM", value: "Yerevan", name: "Yerevan", flag: "🇦🇲" }, // Armenia
  { code: "AT", value: "Vienna", name: "Vienna", flag: "🇦🇹" }, // Austria
  { code: "AZ", value: "Baku", name: "Baku", flag: "🇦🇿" }, // Azerbaijan
  { code: "BY", value: "Minsk", name: "Minsk", flag: "🇧🇾" }, // Belarus
  { code: "BE", value: "Brussels", name: "Brussels", flag: "🇧🇪" }, // Belgium
  { code: "BA", value: "Sarajevo", name: "Sarajevo", flag: "🇧🇦" }, // Bosnia and Herzegovina
  { code: "BG", value: "Sofia", name: "Sofia", flag: "🇧🇬" }, // Bulgaria
  { code: "HR", value: "Zagreb", name: "Zagreb", flag: "🇭🇷" }, // Croatia
  { code: "CY", value: "Nicosia", name: "Nicosia", flag: "🇨🇾" }, // Cyprus
  { code: "CZ", value: "Prague", name: "Prague", flag: "🇨🇿" }, // Czech Republic
  { code: "DK", value: "Copenhagen", name: "Copenhagen", flag: "🇩🇰" }, // Denmark
  { code: "EE", value: "Tallinn", name: "Tallinn", flag: "🇪🇪" }, // Estonia
  { code: "FI", value: "Helsinki", name: "Helsinki", flag: "🇫🇮" }, // Finland
  { code: "FR", value: "Paris", name: "Paris", flag: "🇫🇷" }, // France
  { code: "GE", value: "Tbilisi", name: "Tbilisi", flag: "🇬🇪" }, // Georgia
  { code: "DE", value: "Berlin", name: "Berlin", flag: "🇩🇪" }, // Germany
  { code: "GR", value: "Athens", name: "Athens", flag: "🇬🇷" }, // Greece
  { code: "HU", value: "Budapest", name: "Budapest", flag: "🇭🇺" }, // Hungary
  { code: "IS", value: "Reykjavik", name: "Reykjavik", flag: "🇮🇸" }, // Iceland
  { code: "IE", value: "Dublin", name: "Dublin", flag: "🇮🇪" }, // Ireland
  { code: "IT", value: "Rome", name: "Rome", flag: "🇮🇹" }, // Italy
  { code: "XK", value: "Pristina", name: "Pristina", flag: "🇽🇰" }, // Kosovo
  { code: "LV", value: "Riga", name: "Riga", flag: "🇱🇻" }, // Latvia
  { code: "LT", value: "Vilnius", name: "Vilnius", flag: "🇱🇹" }, // Lithuania
  {
    code: "LU",
    value: "Luxembourg City",
    name: "Luxembourg City",
    flag: "🇱🇺",
  },
  { code: "MT", value: "Valletta", name: "Valletta", flag: "🇲🇹" }, // Malta
  { code: "MD", value: "Chișinău", name: "Chișinău", flag: "🇲🇩" }, // Moldova
  { code: "MC", value: "Monaco", name: "Monaco", flag: "🇲🇨" }, // Monaco
  { code: "ME", value: "Podgorica", name: "Podgorica", flag: "🇲🇪" }, // Montenegro
  { code: "NL", value: "Amsterdam", name: "Amsterdam", flag: "🇳🇱" }, // Netherlands
  { code: "MK", value: "Skopje", name: "Skopje", flag: "🇲🇰" }, // North Macedonia
  { code: "NO", value: "Oslo", name: "Oslo", flag: "🇳🇴" }, // Norway
  { code: "PL", value: "Warsaw", name: "Warsaw", flag: "🇵🇱" }, // Poland
  { code: "PT", value: "Lisbon", name: "Lisbon", flag: "🇵🇹" }, // Portugal
  { code: "RO", value: "Bucharest", name: "Bucharest", flag: "🇷🇴" }, // Romania
  { code: "RU", value: "Moscow", name: "Moscow", flag: "🇷🇺" }, // Russia
  { code: "RS", value: "Belgrade", name: "Belgrade", flag: "🇷🇸" }, // Serbia
  { code: "SK", value: "Bratislava", name: "Bratislava", flag: "🇸🇰" }, // Slovakia
  { code: "SI", value: "Ljubljana", name: "Ljubljana", flag: "🇸🇮" }, // Slovenia
  { code: "ES", value: "Madrid", name: "Madrid", flag: "🇪🇸" }, // Spain
  { code: "SE", value: "Stockholm", name: "Stockholm", flag: "🇸🇪" }, // Sweden
  { code: "CH", value: "Bern", name: "Bern", flag: "🇨🇭" }, // Switzerland
  { code: "UA", value: "Kyiv", name: "Kyiv", flag: "🇺🇦" }, // Ukraine
  { code: "GB", value: "London", name: "London", flag: "🇬🇧" }, // United Kingdom
];

const Capitals = () => {
  const [cityId, setCityId] = useState(0);

  return (
    <SelectGroup>
      <SelectLabel>Avrupa Başkentleri</SelectLabel>
      {europeanCapitals
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ code, value, name, flag }) => (
          <SelectItem
            key={code}
            value={value}
            className="flex items-center"
            onClick={() => setCityId(code)}
          >
            <span className="mr-2">{flag}</span>
            {name}
          </SelectItem>
        ))}
    </SelectGroup>
  );
};

export default Capitals;
