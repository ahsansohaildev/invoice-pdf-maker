export type Quotation = {
  quoteNumber: string;
  date: string;
  validUntil: string;

  clientName: string;
  clientPhone: string;
  clientLocation?: string;

  preparedBy: string;
  terms: string;
};

export type SubSection = {
  id: string;
  heading: string;
  detail: string;

  sqFt?: number;
  rate?: number;
};

export type QuotationItem = {
  id: string;
  description: string;

  // This field is used as SQ.FT / Qty in the UI and PDF.
  packSize: string;

  // This field is used as fallback quantity/unit.
  qty: number;

  // This field is used as rate.
  unitPrice: number;
};

export type ExtendedItem = QuotationItem & {
  subSections: SubSection[];
};

export type Totals = {
  subtotal: number;
  tax: number;
  total: number;
  totalSqFt: number;
};