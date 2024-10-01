import {
  SelectGroup,
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const transportCategoriesArray = [
  { value: "gida", label: "Gıda", emoji: "🍽️" },
  { value: "giysi", label: "Giysi", emoji: "👗" },
  { value: "mobilya", label: "Mobilya", emoji: "🛋️" },
  { value: "elektronik", label: "Elektronik", emoji: "💻" },
  { value: "insaat", label: "İnşaat Malzemeleri", emoji: "🏗️" },
  { value: "kimyasallar", label: "Kimyasallar", emoji: "⚗️" },
  { value: "otomotiv", label: "Otomotiv", emoji: "🚗" },
  { value: "makine", label: "Makine", emoji: "🛠️" },
  { value: "kitap", label: "Kitap", emoji: "📚" },
  { value: "spor", label: "Spor Eşyaları", emoji: "⚽" },
  { value: "inşaatekipmanları", label: "İnşaat Ekipmanları", emoji: "🧰" },
  { value: "bitkiler", label: "Bitkiler", emoji: "🌱" },
  { value: "cicekler", label: "Çiçekler", emoji: "🌸" },
  { value: "diger", label: "Diğer", emoji: "🏷️" },
];

const TransportCategories = () => {
  return (
    <Select name="category">
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {transportCategoriesArray
            .sort((a, b) => a.label.localeCompare(b.label))
            .map(({ value, label, emoji }) => (
              <SelectItem
                key={value}
                value={value}
                className="flex items-center"
              >
                <span className="mr-2">{emoji}</span> {label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TransportCategories;
