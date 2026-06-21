import type { Quotation, QuotationItem } from "../types/quotation";

export const defaultQuotation: Quotation = {
  id: "",
  quoteNumber: "1",
  date: "23/03/2026",
  validUntil: "30/03/2026",
  clientName: "Naveed saab",
  clientPhone: "0300-0000000",
  clientEmail: "abc@gmail.com",
    advancePayment: 0,
  clientLocation: "",
  companyName: "Purify Lube",
  companyAddress: "Plot # 31B, Block No. 03 Sector C2, Township, Lahore",
  companyPhone: "+92 309 4818158",
  companyEmail: "purify.lube.6@gmail.com",
  tax: 0,
  terms: "Payment Terms: 50% advance, 50% after delivery\nDelivery Time: 3-5 working days\nQuotation Validity: 7 days\nLooking forward to your valuable order at the earliest & assuring you our best services at all time.",
  preparedBy: "Nazla",
  designation: "Sales Executive",
};

export const defaultItems = [
  {
    id: crypto.randomUUID(),
    description: "",
    packSize: "",
    qty: 1,
    unitPrice: 0,
    subSections: [],
  },
];