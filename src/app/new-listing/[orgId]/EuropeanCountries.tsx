// This is a failed attempt because I couldnt import the savecountry and make them work together or somrthing but when i add them all inside a file it works ?????????

// import {
//   SelectGroup,
//   SelectLabel,
//   SelectItem,
// } from "@/app/components/ui/select";
// import { useState } from "react";

// const europeanCountries = [
//   { code: "uk", name: "Birleşik Krallık", flag: "🇬🇧" },
//   { code: "it", name: "İtalya", flag: "🇮🇹" },
//   { code: "es", name: "İspanya", flag: "🇪🇸" },
//   { code: "pl", name: "Polonya", flag: "🇵🇱" },
//   { code: "nl", name: "Hollanda", flag: "🇳🇱" },
//   { code: "ru", name: "Rusya", flag: "🇷🇺" },
//   { code: "at", name: "Avusturya", flag: "🇦🇹" },
//   { code: "be", name: "Belçika", flag: "🇧🇪" },
//   { code: "bg", name: "Bulgaristan", flag: "🇧🇬" },
//   { code: "cy", name: "Kıbrıs", flag: "🇨🇾" },
//   { code: "cz", name: "Çek Cumhuriyeti", flag: "🇨🇿" },
//   { code: "dk", name: "Danimarka", flag: "🇩🇰" },
//   { code: "ee", name: "Estonya", flag: "🇪🇪" },
//   { code: "fi", name: "Finlandiya", flag: "🇫🇮" },
//   { code: "fr", name: "Fransa", flag: "🇫🇷" },
//   { code: "de", name: "Almanya", flag: "🇩🇪" },
//   { code: "gr", name: "Yunanistan", flag: "🇬🇷" },
//   { code: "hu", name: "Macaristan", flag: "🇭🇺" },
//   { code: "ie", name: "İrlanda", flag: "🇮🇪" },
//   { code: "lt", name: "Litvanya", flag: "🇱🇹" },
//   { code: "lu", name: "Lüksemburg", flag: "🇱🇺" },
//   { code: "lv", name: "Letonya", flag: "🇱🇻" },
//   { code: "mt", name: "Malta", flag: "🇲🇹" },
//   { code: "pt", name: "Portekiz", flag: "🇵🇹" },
//   { code: "ro", name: "Romanya", flag: "🇷🇴" },
//   { code: "se", name: "İsveç", flag: "🇸🇪" },
//   { code: "si", name: "Slovenya", flag: "🇸🇮" },
//   { code: "sk", name: "Slovakya", flag: "🇸🇰" },
//   { code: "hr", name: "Hırvatistan", flag: "🇭🇷" },
//   { code: "rs", name: "Sırbistan", flag: "🇷🇸" },
//   { code: "ba", name: "Bosna-Hersek", flag: "🇧🇦" },
//   { code: "me", name: "Karadağ", flag: "🇲🇪" },
//   { code: "mk", name: "Kuzey Makedonya", flag: "🇲🇰" },
// ];

// export function saveCountryJob(data: FormData, countryId: string) {
//   data.set("countryId", countryId);
// }

// const Countries = ({ onSelectCountry }) => {
//   return (
//     <SelectGroup>
//       <SelectLabel>Tüm Ülkeler</SelectLabel>
//       {europeanCountries
//         .sort((a, b) => a.name.localeCompare(b.name))
//         .map(({ code, name, flag }) => (
//           <SelectItem
//             key={code}
//             value={code}
//             className="flex items-center"
//             onClick={() => onSelectCountry(code)}
//           >
//             <span className="mr-2">{flag}</span>
//             {name}
//           </SelectItem>
//         ))}
//     </SelectGroup>
//   );
// };

// export default Countries;
