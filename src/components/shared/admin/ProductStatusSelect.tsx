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
export interface ProductStatus {
  _id: string;
  name: string;
}
//
interface ProductStatusSelectProps {
  statuses: ProductStatus[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
//
export default function ProductStatusSelect({
  statuses,
  value,
  onValueChange,
  placeholder = "Select a status",
  disabled = false,
}: ProductStatusSelectProps) {
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
        {statuses.map((status) => (
          <SelectItem key={status._id} value={status._id}>
            {status.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
