import type { ExtendedItem, SubSection } from "../types/quotation";

export function parseSqFt(value: string | number | undefined | null): number {
  if (value === undefined || value === null || value === "") return 0;

  const cleanedValue =
    typeof value === "string" ? value.replace(/,/g, "").trim() : value;

  const numberValue =
    typeof cleanedValue === "number"
      ? cleanedValue
      : Number.parseFloat(cleanedValue);

  return Number.isFinite(numberValue) ? numberValue : 0;
}

export function subSectionHasOwnValues(
  section: Pick<SubSection, "sqFt" | "rate">
): boolean {
  return Number(section.sqFt ?? 0) > 0 || Number(section.rate ?? 0) > 0;
}

export function subSectionAmount(
  section: Pick<SubSection, "sqFt" | "rate">
): number {
  if (!subSectionHasOwnValues(section)) return 0;

  const sqFt = Number(section.sqFt ?? 0);
  const rate = Number(section.rate ?? 0);

  return sqFt * rate;
}

export function itemAmount(item: ExtendedItem): number {
  const subSections = item.subSections ?? [];
  const subSectionsWithValues = subSections.filter(subSectionHasOwnValues);

  if (subSectionsWithValues.length > 0) {
    return subSectionsWithValues.reduce(
      (sum, section) => sum + subSectionAmount(section),
      0
    );
  }

  const sqFt = parseSqFt(item.packSize);
  const qty = Number(item.qty ?? 0);
  const rate = Number(item.unitPrice ?? 0);
  const base = sqFt > 0 ? sqFt : qty;

  return base * rate;
}

export function itemSqFt(item: ExtendedItem): number {
  const subSections = item.subSections ?? [];
  const subSectionsWithValues = subSections.filter(subSectionHasOwnValues);

  if (subSectionsWithValues.length > 0) {
    return subSectionsWithValues.reduce(
      (sum, section) => sum + Number(section.sqFt ?? 0),
      0
    );
  }

  const sqFt = parseSqFt(item.packSize);
  const qty = Number(item.qty ?? 0);

  return sqFt > 0 ? sqFt : qty;
}

export function calculateTotals(items: ExtendedItem[]) {
  const subtotal = items.reduce((sum, item) => sum + itemAmount(item), 0);
  const totalSqFt = items.reduce((sum, item) => sum + itemSqFt(item), 0);

  return {
    subtotal,
    tax: 0,
    total: subtotal,
    totalSqFt,
  };
}