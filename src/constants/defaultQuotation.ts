import type { ExtendedItem, Quotation } from "../types/quotation";

export const defaultQuotation: Quotation = {
  quoteNumber: "1",
  date: "23/03/2026",
  validUntil: "30/03/2026",

  clientName: "",
  clientPhone: "",
  clientLocation: "",

  preparedBy: "",
  terms: "Payment Terms: 50% advance, 50% after delivery",

  advancePayment: 0,
  tax: 0,
};

export const defaultItems: ExtendedItem[] = [
  {
    id: "item-1",
    description: "",
    packSize: "",
    qty: 1,
    unitPrice: 0,
    subSections: [],
  },
];
