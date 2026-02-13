
import { isValid } from "date-fns";

export function parseTimestampDateFns(input: unknown): Date | null {
  if (input === null || input === undefined) return null;

  const ts =
    typeof input === "number"
      ? input
      : typeof input === "string"
      ? Number(input)
      : NaN;

  if (!Number.isFinite(ts)) return null;

  // seconds → milliseconds
  const normalized = ts < 1e12 ? ts * 1000 : ts;

  const date = new Date(normalized);
  return isValid(date) ? date : null;
}
