export function formatPKR(value: number | string | null | undefined): string {
  const num = typeof value === "number" ? (isNaN(value) ? 0 : value) : Number(value) || 0;
  return `\u20A8 ${num.toLocaleString("en-PK")}`;
}
