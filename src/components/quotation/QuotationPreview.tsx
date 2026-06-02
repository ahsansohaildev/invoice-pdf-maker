import { forwardRef } from "react";
import type { Quotation, QuotationItem, Totals } from "../../types/quotation";
import { formatCurrency } from "../../utils/formatCurrency";

/* ── constants ── */
const FIXED_ROWS = 7;
const GOLD      = "#d4af37";
const GOLD_DARK = "#b8960c";
const BLACK     = "#1a1a1a";

type Props = {
  quotation: Quotation;
  items: QuotationItem[];
  totals: Totals;
};

export const QuotationPreview = forwardRef<HTMLDivElement, Props>(
  ({ quotation, items, totals }, ref) => {

    /* Always exactly 7 rows — pad with null for empty cells */
    const tableRows: (QuotationItem | null)[] = [
      ...items.slice(0, FIXED_ROWS),
      ...Array<null>(Math.max(0, FIXED_ROWS - items.length)).fill(null),
    ];

    /* ── shared styles ── */
    const thStyle: React.CSSProperties = {
      border: `1px solid ${GOLD_DARK}`,
      padding: "11px 10px",
      background: GOLD,
      color: BLACK,
      textAlign: "center",
      fontWeight: "700",
      fontSize: "12px",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    };

    const tdBase: React.CSSProperties = {
      border: "1px solid #e0e0e0",
      padding: "8px 10px",
      textAlign: "center",
      fontSize: "12px",
      color: "#222",
      height: "36px",
    };
    const tdWhite: React.CSSProperties = { ...tdBase, background: "#ffffff" };
    const tdTint:  React.CSSProperties = { ...tdBase, background: "#fdf9ed" };

    return (
      <section className="h-screen overflow-auto bg-slate-200 p-8">
        <div ref={ref} className="pdf-sheet relative p-0">

          {/* Template background */}
          <img
            src="/aone-template.png"
            alt="Template"
            className="absolute inset-0 w-full h-full"
          />

          {/* Content layer */}
          <div className="relative z-10">

            {/* ══ DATE — on the template dotted line ══ */}
            <div
              style={{
                position: "absolute",
                top: "93px",
                right: "98px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#111",
                letterSpacing: "0.5px",
              }}
            >
              {quotation.date}
            </div>

            {/* ══ CLIENT CARD ══ */}
            <div
              style={{
                position: "absolute",
                top: "218px",
                left: "50px",
                width: "660px",
                background: "rgba(255,255,255,0.97)",
                borderLeft: `5px solid ${GOLD}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
                padding: "12px 20px 14px",
              }}
            >
              {/* Bill To label */}
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "800",
                  color: GOLD_DARK,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "9px",
                  borderBottom: `1px solid ${GOLD}`,
                  paddingBottom: "5px",
                }}
              >
                Bill To
              </div>

              {/* Client + Phone row */}
              <div style={{ display: "flex", gap: "48px", marginBottom: "5px" }}>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  <strong style={{ color: BLACK }}>Client: </strong>
                  <span style={{ color: "#333" }}>{quotation.clientName}</span>
                </p>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  <strong style={{ color: BLACK }}>Phone: </strong>
                  <span style={{ color: "#333" }}>{quotation.clientPhone}</span>
                </p>
              </div>

              {/* Location */}
             <p style={{ fontSize: "14px", margin: 0 }}>
  <strong style={{ color: BLACK }}>Location: </strong>
  {/* BEFORE: <span>Lahore</span> */}
  <span style={{ color: "#333" }}>{quotation.clientLocation}</span>
</p>

            </div>

            {/* ══ ITEMS TABLE — always 7 rows ══ */}
            <div
              style={{
                position: "absolute",
                top: "355px",
                left: "40px",
                width: "715px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: "58px"  }}>S. No</th>
                    <th style={thStyle}>Description</th>
                    <th style={{ ...thStyle, width: "110px" }}>Sq. Ft</th>
                    <th style={{ ...thStyle, width: "115px" }}>Rate</th>
                    <th style={{ ...thStyle, width: "120px" }}>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.map((item, index) => {
                    const total =
                      item
                        ? Number(item.qty || 0) * Number(item.unitPrice || 0)
                        : null;
                    const cell = index % 2 === 1 ? tdTint : tdWhite;

                    return (
                      <tr key={index}>
                        <td style={{ ...cell, fontWeight: "600" }}>
                          {index + 1}
                        </td>
                        <td style={{ ...cell, textAlign: "left", paddingLeft: "14px" }}>
                          {item?.description ?? ""}
                        </td>
                        <td style={cell}>{item?.packSize ?? ""}</td>
                        <td style={cell}>
                          {item ? formatCurrency(item.unitPrice) : ""}
                        </td>
                        <td style={{ ...cell, fontWeight: "600" }}>
                          {total !== null ? formatCurrency(total) : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ══ TOTALS SUMMARY BOX ══ */}
            <div
              style={{
                position: "absolute",
                top: "700px",
                right: "40px",
                width: "285px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.13)",
                overflow: "hidden",
                borderRadius: "3px",
              }}
            >
              {/* Black header */}
              <div
                style={{
                  background: BLACK,
                  color: GOLD,
                  padding: "8px 14px",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Summary
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <tbody>
                  <tr>
                    <td style={{ ...tdWhite, fontWeight: "600", textAlign: "left",  paddingLeft: "14px" }}>Subtotal</td>
                    <td style={{ ...tdWhite, textAlign: "right", paddingRight: "14px" }}>
                      {formatCurrency(totals.subtotal)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ ...tdTint,  fontWeight: "600", textAlign: "left",  paddingLeft: "14px" }}>Tax</td>
                    <td style={{ ...tdTint,  textAlign: "right", paddingRight: "14px" }}>
                      {formatCurrency(totals.tax)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: `1px solid ${GOLD_DARK}`, padding: "12px 14px", background: GOLD, fontWeight: "800", fontSize: "14px", color: BLACK }}>
                      Grand Total
                    </td>
                    <td style={{ border: `1px solid ${GOLD_DARK}`, padding: "12px 14px", background: GOLD, fontWeight: "800", fontSize: "14px", color: BLACK, textAlign: "right" }}>
                      {formatCurrency(totals.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
    );
  }
);

QuotationPreview.displayName = "QuotationPreview";