import { forwardRef, useEffect, useState } from "react";
import type { Quotation, QuotationItem, Totals } from "../../types/quotation";
import { formatCurrency } from "../../utils/formatCurrency";
import { imageToDataUrl } from "../../utils/imageToDataUrl";
import { TermsBox } from "./TermsBox";
import { TotalsBox } from "./TotalsBox";

type Props = {
  quotation: Quotation;
  items: QuotationItem[];
  totals: Totals;
};

export const QuotationPreview = forwardRef<HTMLDivElement, Props>(
  ({ quotation, items, totals }, ref) => {
    const [safeLogo, setSafeLogo] = useState("/logo.png");

    useEffect(() => {
      let mounted = true;

      imageToDataUrl("/logo.png")
        .then((dataUrl) => {
          if (mounted) setSafeLogo(dataUrl);
        })
        .catch(() => {
          if (mounted) setSafeLogo("/logo.png");
        });

      return () => {
        mounted = false;
      };
    }, []);

    return (
      <section className="h-screen overflow-auto bg-slate-200 p-8">
        <div ref={ref} className="pdf-sheet">
          <header className="pdf-header">
            <div>
              <img src={safeLogo} alt="Company Logo" className="pdf-logo" />
            </div>

            <h1 className="pdf-title">QUOTATION</h1>
          </header>

          <section className="pdf-info-grid">
            <div>
              <p>
                <strong>Quotation Number:</strong> {quotation.quoteNumber}
              </p>
              <p>
                <strong>Date:</strong> {quotation.date}
              </p>
              <p>
                <strong>Valid Until:</strong> {quotation.validUntil}
              </p>
            </div>

            <div>
              <p>
                <strong>To:</strong> {quotation.clientName}
              </p>
              <p>
                <strong>Phone:</strong> {quotation.clientPhone}
              </p>
              <p>
                <strong>Email:</strong> {quotation.clientEmail}
              </p>
            </div>
          </section>

          <section className="pdf-from">
            <p className="pdf-section-label">From:</p>
            <p>📍 {quotation.companyAddress}</p>
            <p>☎ {quotation.companyPhone}</p>
            <p>✉ {quotation.companyEmail}</p>
          </section>

          <table className="pdf-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Pack Size</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => {
                const lineTotal =
                  Number(item.qty || 0) * Number(item.unitPrice || 0);

                return (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td className="pdf-center">{item.packSize}</td>
                    <td className="pdf-center">{item.qty}</td>
                    <td className="pdf-center">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="pdf-center">{formatCurrency(lineTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pdf-spacer"></div>

          <TotalsBox totals={totals} />

          <TermsBox terms={quotation.terms} />

          <footer className="pdf-signature">
            <div></div>

            <div>
              <div className="pdf-signature-line"></div>
              <p>
                <strong>{quotation.preparedBy}</strong>
              </p>
              <p>{quotation.designation}</p>
            </div>
          </footer>
        </div>
      </section>
    );
  }
);

QuotationPreview.displayName = "QuotationPreview";