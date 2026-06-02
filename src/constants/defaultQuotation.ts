import type { Quotation, QuotationItem } from "../types/quotation";

export const defaultQuotation: Quotation = {
  quoteNumber: "1",
  date: "23/03/2026",
  validUntil: "30/03/2026",

  clientName: "Naveed saab",
  clientPhone: "0300-0000000",
  clientEmail: "abc@gmail.com",

  companyName: "Purify Lube",
  companyAddress: "Plot # 31B, Block No. 03 Sector C2, Township, Lahore",
  companyPhone: "+92 309 4818158",
  companyEmail: "purify.lube.6@gmail.com",

  tax: 0,
  terms:
    "Payment Terms: 50% advance, 50% after delivery\nDelivery Time: 3-5 working days\nQuotation Validity: 7 days\nLooking forward to your valuable order at the earliest & assuring you our best services at all time.",

  preparedBy: "Nazla",
  designation: "Sales Executive",
};

export const defaultItems: QuotationItem[] = [
  {
    id: crypto.randomUUID(),
    description: "Engine Oil 20W-50",
    packSize: "4 Litre",
    qty: 1,
    unitPrice: 2500,
  },
];