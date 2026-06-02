export type QuotationItem = {
  id: string;
  description: string;
  packSize: string;
  qty: number;
  unitPrice: number;
};

export type Quotation = {
  quoteNumber: string;
  date: string;
  validUntil: string;

  clientName: string;
  clientPhone: string;
  clientEmail: string;

  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;

  tax: number;
  terms: string;

  preparedBy: string;
  designation: string;
};

export type Totals = {
  subtotal: number;
  tax: number;
  total: number;
};