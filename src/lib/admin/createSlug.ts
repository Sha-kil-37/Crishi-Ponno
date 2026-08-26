interface SlugProps {
  value: string;
  separator?: string;
}

export function createSlug({ value, separator = "-" }: SlugProps): string {
  if (!value) {
    return "";
  }
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, separator)
    .replace(/-+/g, separator);
}
