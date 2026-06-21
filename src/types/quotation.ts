export type Quotation = {
  quoteNumber: string;
  date: string;
  validUntil: string;

  clientName: string;
  clientPhone: string;
  clientLocation?: string;

  preparedBy: string;
  terms: string;

  advancePayment?: number;
  tax?: number;
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
  packSize: string;
  qty: number;
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
