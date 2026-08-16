"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProductBrand {
  _id: string;
  name: string;
}

interface ProductBrandSelectProps {
  brands: ProductBrand[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ProductBrandSelect({
  brands,
  value,
  onValueChange,
  placeholder = "Select a brand",
  disabled = false,
}: ProductBrandSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value !== null) {
          onValueChange(value);
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {brands.map((brand) => (
          <SelectItem key={brand._id} value={brand._id}>
            {brand.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
