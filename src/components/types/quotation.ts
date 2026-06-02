export interface QuotationItem {
  id: string;
  description: string;
  packSize: string;   // Sq. Ft / area field
  qty: number;
  unitPrice: number;  // was "rate" — renamed to match components
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientName: string;       // was "customerName"
  clientPhone: string;      // was missing entirely
  clientLocation: string;   // was "location"
  date: string;
  terms?: string;
}

export interface Totals {
  subtotal: number;
  tax: number;
  total: number;            // was "totalAmount"
}