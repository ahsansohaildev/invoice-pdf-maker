export interface QuotationItem {
  id: string;
  description: string;
  packSize: string;
  qty: number;
  unitPrice: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientLocation: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  tax: number;
  terms: string;
  preparedBy: string;
  designation: string;
}

export interface Totals {
  subtotal: number;
  tax: number;
  total: number;
}
