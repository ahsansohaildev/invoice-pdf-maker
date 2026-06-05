import { forwardRef } from "react";
import type { Quotation, Totals } from "../../types/quotation";
import { formatCurrency } from "../../utils/formatCurrency";
import type { ExtendedItem } from "./QuotationItems";

/* ── constants ── */
const GOLD        = "#d4af37";
const GOLD_DARK   = "#b8960c";
const BLACK       = "#1a1a1a";
const FIXED_ROWS  = 7;
/**
 * TABLE_BOTTOM — px from sheet bottom to table lower edge.
 * Tune this if table overlaps the template footer bar.
 * Template footer ≈ 163 px tall on a 1123 px A4 sheet.
 */
const TABLE_BOTTOM = 163;

type Props = {
  quotation: Quotation;
  items: ExtendedItem[];
  totals: Omit<Totals, "tax">;
};

export const QuotationPreview = forwardRef<HTMLDivElement, Props>(
  ({ quotation, items, totals }, ref) => {

    /* Pad to always have exactly FIXED_ROWS rows */
    const tableRows: (ExtendedItem | null)[] = [
      ...items.slice(0, FIXED_ROWS),
      ...Array<null>(Math.max(0, FIXED_ROWS - items.length)).fill(null),
    ];

    /* ── Total Sq.Ft ── */
    const totalSqFt = items.reduce((acc, item) => {
      const num = parseFloat(item.packSize || "0");
      return acc + (isNaN(num) ? 0 : num);
    }, 0);

    /* ── shared styles ── */
    const thStyle: React.CSSProperties = {
      border: `1px solid ${GOLD_DARK}`,
      padding: "10px 12px",
      background: `linear-gradient(135deg, ${GOLD} 0%, #c9a420 100%)`,
      color: BLACK,
      textAlign: "center",
      fontWeight: "900",
      fontSize: "11px",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      verticalAlign: "middle",
      fontFamily: "'Georgia', serif",
    };

    const tdBase: React.CSSProperties = {
      border: "1px solid #e8e0c8",
      padding: "0",
      textAlign: "center",
      fontSize: "13px",
      color: "#222",
      verticalAlign: "top",
    };
    const tdWhite: React.CSSProperties = { ...tdBase, background: "#ffffff" };
    const tdTint:  React.CSSProperties = { ...tdBase, background: "#fffef8" };

    return (
      <section className="h-screen overflow-auto bg-slate-200 p-8">
        <div
          ref={ref}
          className="pdf-sheet"
          style={{
            position: "relative",
            width: "794px",
            height: "1123px",
            margin: "0 auto",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {/* Template background */}
          <img
            src="/aone-template.png"
            alt="Template"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />

          {/* Content layer */}
          <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>

            {/* ══ DATE ══ */}
            <div
              style={{
                position: "absolute",
                top: "93px",
                right: "98px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#111",
                letterSpacing: "0.5px",
                fontFamily: "'Georgia', serif",
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
                width: "694px",
                background: "rgba(255,255,255,0.97)",
                borderLeft: `5px solid ${GOLD}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
                padding: "12px 20px 14px",
              }}
            >
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
                  fontFamily: "'Georgia', serif",
                }}
              >
                Bill To
              </div>
              <div style={{ display: "flex", gap: "48px", marginBottom: "5px" }}>
                <p style={{ fontSize: "14px", margin: 0, fontFamily: "Georgia, serif" }}>
                  <strong style={{ color: BLACK }}>Client: </strong>
                  <span style={{ color: "#333" }}>{quotation.clientName}</span>
                </p>
                <p style={{ fontSize: "14px", margin: 0, fontFamily: "Georgia, serif" }}>
                  <strong style={{ color: BLACK }}>Phone: </strong>
                  <span style={{ color: "#333" }}>{quotation.clientPhone}</span>
                </p>
              </div>
              <p style={{ fontSize: "14px", margin: 0, fontFamily: "Georgia, serif" }}>
                <strong style={{ color: BLACK }}>Location: </strong>
                <span style={{ color: "#333" }}>{quotation.clientLocation}</span>
              </p>
            </div>

            {/* ══ ITEMS TABLE ══ */}
            <div
              style={{
                position: "absolute",
                top: "355px",
                left: "40px",
                right: "40px",
                /* Sits exactly above the template's black footer bar */
                bottom: `${TABLE_BOTTOM}px`,
                border: `1.5px solid ${GOLD_DARK}`,
                borderRadius: "2px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                  height: "100%",
                }}
              >
                <colgroup>
                  <col style={{ width: "44px" }} />
                  <col />
                  <col style={{ width: "82px" }} />
                  <col style={{ width: "92px" }} />
                  <col style={{ width: "108px" }} />
                </colgroup>

                {/* ── HEADER ── */}
                <thead>
                  <tr>
                    <th style={{ ...thStyle }}>S.<br />No</th>
                    <th style={{ ...thStyle, textAlign: "left", paddingLeft: "16px" }}>
                      Description
                    </th>
                    <th style={{ ...thStyle }}>Sq. Ft</th>
                    <th style={{ ...thStyle }}>Rate</th>
                    <th style={{ ...thStyle }}>Amount</th>
                  </tr>
                </thead>

                {/* ── BODY ── */}
                <tbody style={{ height: "100%" }}>
                  {tableRows.map((item, index) => {
                    const subSections = item?.subSections ?? [];
                    const amount = item
                      ? Number(item.qty || 0) * Number(item.unitPrice || 0)
                      : null;
                    const cell = index % 2 === 0 ? tdWhite : tdTint;
                    const hasContent = !!(item?.description || subSections.length > 0);

                    return (
                      <tr
                        key={index}
                        style={{ height: `${100 / FIXED_ROWS}%` }}
                      >

                        {/* S.No — centered vertically */}
                        <td
                          style={{
                            ...cell,
                            textAlign: "center",
                            fontWeight: "700",
                            fontSize: "14px",
                            verticalAlign: "middle",
                            color: hasContent ? GOLD_DARK : "#d8d0b8",
                            borderRight: `1px solid #e8e0c8`,
                            fontFamily: "'Georgia', serif",
                          }}
                        >
                          {index + 1}
                        </td>

                        {/* ── DESCRIPTION ── */}
                        <td
                          style={{
                            ...cell,
                            textAlign: "left",
                            verticalAlign: "top",
                            padding: "12px 12px 12px 16px",
                            borderRight: `1px solid #e8e0c8`,
                          }}
                        >
                          {item ? (
                            <div style={{ width: "100%" }}>

                              {/* Main title — bold BLACK */}
                              <p
                                style={{
                                  margin: "0 0 0 0",
                                  fontWeight: "800",
                                  fontSize: "13px",
                                  color: BLACK,          /* ← solid black */
                                  lineHeight: "1.5",
                                  fontFamily: "'Georgia', serif",
                                  letterSpacing: "0.2px",
                                  textAlign: "left",
                                }}
                              >
                                {item.description}
                              </p>

                              {/* Sub-sections */}
                              {subSections.map((sec, si) => (
                                <div
                                  key={sec.id}
                                  style={{
                                    marginTop: "7px",
                                    paddingTop: "7px",
                                    borderTop: si === 0
                                      ? `1px dashed #d8c87a`
                                      : `1px dashed #ece8d8`,
                                    textAlign: "left",
                                  }}
                                >
                                  {/* Sub-heading — GOLD + BOLD + BLACK text */}
                                  {sec.heading && (
                                    <p
                                      style={{
                                        margin: "0 0 2px 0",
                                        fontWeight: "900",
                                        fontSize: "11.5px",
                                        color: BLACK,           /* ← solid black as requested */
                                        textAlign: "left",
                                        letterSpacing: "0.8px",
                                        textTransform: "uppercase",
                                        fontFamily: "'Georgia', serif",
                                        /* Gold underline accent instead */
                                        // borderBottom: `1.5px solid ${GOLD}`,
                                        paddingBottom: "1px",
                                        display: "inline-block",
                                      }}
                                    >
                                      {sec.heading}
                                    </p>
                                  )}

                                  {/* Sub-detail — dark italic */}
                                  {sec.detail && (
                                    <p
                                      style={{
                                        margin: "3px 0 0 0",
                                        fontSize: "11.5px",
                                        color: "#3a3a3a",       /* ← near-black */
                                        textAlign: "left",
                                        lineHeight: "1.55",
                                        fontStyle: "italic",
                                        fontFamily: "'Georgia', serif",
                                        display: "block",
                                      }}
                                    >
                                      {sec.detail}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : ""}
                        </td>

                        {/* Sq. Ft */}
                        <td
                          style={{
                            ...cell,
                            verticalAlign: "middle",
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: item?.packSize ? "700" : "400",
                            color: item?.packSize ? BLACK : "#d0c898",
                            borderRight: `1px solid #e8e0c8`,
                            fontFamily: "'Georgia', serif",
                            padding: "8px 6px",
                          }}
                        >
                          {item?.packSize || ""}
                        </td>

                        {/* Rate */}
                        <td
                          style={{
                            ...cell,
                            verticalAlign: "middle",
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: (item && item.unitPrice > 0) ? BLACK : "#d0c898",
                            borderRight: `1px solid #e8e0c8`,
                            fontFamily: "'Georgia', serif",
                            padding: "8px 6px",
                          }}
                        >
                          {item ? formatCurrency(item.unitPrice) : ""}
                        </td>

                        {/* Amount */}
                        <td
                          style={{
                            ...cell,
                            verticalAlign: "middle",
                            textAlign: "center",
                            fontSize: "13.5px",
                            fontWeight: "800",
                            color: (amount && amount > 0) ? BLACK : "#d0c898",
                            fontFamily: "'Georgia', serif",
                            padding: "8px 6px",
                          }}
                        >
                          {amount !== null && amount > 0
                            ? formatCurrency(amount)
                            : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* ── FOOTER — seamlessly flush against last row ── */}
                <tfoot>
                  <tr style={{ height: "52px" }}>

                    {/* Left empty area */}
                    <td
                      colSpan={2}
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: `1px solid ${GOLD_DARK}`,
                        borderBottom: "none",
                        borderLeft: "none",
                        background: "linear-gradient(to right, #fafafa, #f5f0e0)",
                        padding: "0 16px",
                        verticalAlign: "middle",
                      }}
                    >
                      {/* Optional: "Thank you for your business" text */}
                      <span style={{
                        fontSize: "10px",
                        color: "#bba840",
                        fontStyle: "italic",
                        fontFamily: "'Georgia', serif",
                        letterSpacing: "0.5px",
                      }}>
                        Thank you for your business
                      </span>
                    </td>

                    {/* Total Sq Ft */}
                    <td
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: `1px solid ${GOLD_DARK}`,
                        borderBottom: "none",
                        borderLeft: `1px solid ${GOLD_DARK}`,
                        background: "#fafaf5",
                        padding: "6px 2px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <p style={{
                        margin: "0 0 2px 0",
                        fontSize: "8.5px",
                        fontWeight: "800",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                        fontFamily: "'Georgia', serif",
                      }}>
                        Total Sq Ft
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: "900",
                        color: BLACK,
                        fontFamily: "'Georgia', serif",
                        lineHeight: "1.1",
                      }}>
                        {totalSqFt > 0 ? totalSqFt.toLocaleString("en-PK") : "—"}
                      </p>
                    </td>

                    {/* Empty rate cell */}
                    <td
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: `1px solid ${GOLD_DARK}`,
                        borderBottom: "none",
                        borderLeft: `1px solid ${GOLD_DARK}`,
                        background: "#fafaf5",
                        padding: "6px 8px",
                      }}
                    />

                    {/* Total Amount — gold gradient */}
                    <td
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: "none",
                        borderBottom: "none",
                        borderLeft: `1px solid ${GOLD_DARK}`,
                        background: `linear-gradient(145deg, ${GOLD} 0%, #e8c84a 40%, #c9a420 100%)`,
                        padding: "6px 8px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                      }}
                    >
                      <p style={{
                        margin: "0 0 2px 0",
                        fontSize: "8.5px",
                        fontWeight: "800",
                        color: "#5a4000",
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                        fontFamily: "'Georgia', serif",
                      }}>
                        Total Amount
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "900",
                        color: BLACK,
                        fontFamily: "'Georgia', serif",
                        letterSpacing: "0.3px",
                        lineHeight: "1.1",
                      }}>
                        {formatCurrency(totals.total)}/-
                      </p>
                    </td>
                  </tr>
                </tfoot>

              </table>
            </div>

          </div>
        </div>
      </section>
    );
  }
);

QuotationPreview.displayName = "QuotationPreview";