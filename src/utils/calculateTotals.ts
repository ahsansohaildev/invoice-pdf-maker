import type { QuotationItem, Totals } from "../types/quotation";

export function calculateTotals(items: QuotationItem[], tax: number): Totals {
  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.qty || 0);
    const unitPrice = Number(item.unitPrice || 0);

    return sum + qty * unitPrice;
  }, 0);

  const finalTax = Number(tax || 0);

  return {
    subtotal,
    tax: finalTax,
    total: subtotal + finalTax,
  };
}