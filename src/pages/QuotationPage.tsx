import { useMemo, useRef, useState } from "react";
import { QuotationForm } from "../components/quotation/QuotationForm";
import { QuotationPreview } from "../components/quotation/QuotationPreview";
import { defaultItems, defaultQuotation } from "../constants/defaultQuotation";
import type { ExtendedItem, Quotation } from "../types/quotation";
import { calculateTotals } from "../utils/calculateTotals";
import { generatePdf } from "../utils/generatePdf";

type QuotationPageProps = {
  onLogout?: () => void;
};

export function QuotationPage({ onLogout }: QuotationPageProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [quotation, setQuotation] = useState<Quotation>(defaultQuotation);
  const [items, setItems] = useState<ExtendedItem[]>(defaultItems);

  const totals = useMemo(() => {
    return calculateTotals(items, quotation.tax ?? 0);
  }, [items, quotation.tax]);

  function handleDownload() {
    if (!previewRef.current) return;

    const quoteNo = quotation.quoteNumber || "Draft";
    const fileName = "AONE-Quotation-" + quoteNo + ".pdf";

    generatePdf(previewRef.current, fileName);
  }

  function handleLogout() {
    if (onLogout) {
      onLogout();
      return;
    }

    localStorage.removeItem("aone-auth");
    window.location.href = "/login";
  }

  return (
    <main className="grid min-h-screen grid-cols-[420px_1fr] bg-slate-200">
      <QuotationForm
        quotation={quotation}
        items={items}
        setQuotation={setQuotation}
        setItems={setItems}
        onDownload={handleDownload}
        onLogout={handleLogout}
      />

      <QuotationPreview
        ref={previewRef}
        quotation={quotation}
        items={items}
        totals={totals}
      />
    </main>
  );
}

export default QuotationPage;
