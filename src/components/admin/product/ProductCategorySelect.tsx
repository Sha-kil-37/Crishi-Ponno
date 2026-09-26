"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProductCategory {
  _id: string;
  name: string;
}

interface ProductCategorySelectProps {
  categories: ProductCategory[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ProductCategorySelect({
  categories,
  value,
  onValueChange,
  placeholder = "Select a category",
  disabled = false,
}: ProductCategorySelectProps) {
  return (
    <Select
    required
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
        {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
