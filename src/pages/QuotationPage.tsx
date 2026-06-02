import { useMemo, useRef, useState } from "react";
import { QuotationForm } from "../components/quotation/QuotationForm";
import { QuotationPreview } from "../components/quotation/QuotationPreview";
import { defaultItems, defaultQuotation } from "../constants/defaultQuotation";
import { calculateTotals } from "../utils/calculateTotals";
import { generatePdf } from "../utils/generatePdf";

type Props = {
  onLogout: () => void;
};

export function QuotationPage({ onLogout }: Props) {
  const [quotation, setQuotation] = useState(defaultQuotation);
  const [items, setItems] = useState(defaultItems);

  const previewRef = useRef<HTMLDivElement | null>(null);

  const totals = useMemo(() => {
    return calculateTotals(items, quotation.tax);
  }, [items, quotation.tax]);

  function handleDownload() {
    generatePdf(
      previewRef.current,
      `Quotation-${quotation.quoteNumber || "New"}.pdf`
    );
  }

  return (
    <main className="grid min-h-screen grid-cols-[520px_1fr] bg-slate-100">
      <QuotationForm
        quotation={quotation}
        items={items}
        setQuotation={setQuotation}
        setItems={setItems}
        onDownload={handleDownload}
        onLogout={onLogout}
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