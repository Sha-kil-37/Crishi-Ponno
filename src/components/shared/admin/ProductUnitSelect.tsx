"use client";
//
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//
export interface ProductUnit {
  _id: string;
  name: string;
}

interface ProductUnitSelectProps {
  units: ProductUnit[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ProductUnitSelect({
  units,
  value,
  onValueChange,
  placeholder = "Select a unit",
  disabled = false,
}: ProductUnitSelectProps) {
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
        {units.map((unit) => (
          <SelectItem key={unit._id} value={unit._id}>
            {unit.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
