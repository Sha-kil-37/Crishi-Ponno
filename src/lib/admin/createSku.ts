import { randomBytes } from "crypto";
//
interface CreateSkuData {
  name: string;
  category: string;
  brand?: string;
}

function createCode(value: string, length = 3): string {
  return value
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, length)
    .toUpperCase();
}

export function createSku({ name, category, brand }: CreateSkuData): string {
  const productCode = createCode(name, 4);
  const categoryCode = createCode(category, 3);
  const brandCode = brand ? createCode(brand, 3) : "GEN";

  const uniqueCode = randomBytes(2).toString("hex").toUpperCase();

  return `CP-${categoryCode}-${productCode}-${brandCode}-${uniqueCode}`;
}
