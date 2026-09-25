export const DEFAULT_LIMIT = 12;
export const MAX_LIMIT = 50;
export const MIN_PRICE = 0;
export const MAX_PRICE = 100000;
//
export const PRODUCT_STATUS_OPTIONS = [
  "In Stock",
  "Low Stock",
  "Out of Stock",
  "Pre Order",
  "Discontinued",
] as const;

export type ProductStatusFilter =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock"
  | "Pre Order"
  | "Discontinued";

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
] as const;
//
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//
export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//
export function parseListParam(value: string | null | undefined) {
  if (!value) {
    return [] as string[];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function updateQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number | null | undefined,
) {
  if (value === null || value === undefined || value === "") {
    searchParams.delete(key);
    return;
  }

  searchParams.set(key, String(value));
}

export function buildShopQueryString(
  values: Record<string, string | number | null | undefined>,
) {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  return params.toString();
}

export function getParsedNumber(
  value: string | null | undefined,
  fallback?: number,
) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function normalizeSortValue(value: string | null | undefined) {
  const allowed = SORT_OPTIONS.map((item) => item.value);
  return allowed.includes(value as (typeof SORT_OPTIONS)[number]["value"])
    ? value
    : "recommended";
}
