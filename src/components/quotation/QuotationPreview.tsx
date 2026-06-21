import { forwardRef, type CSSProperties } from "react";
import type {
  ExtendedItem,
  Quotation,
  SubSection,
  Totals,
} from "../../types/quotation";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  itemAmount,
  subSectionAmount,
  subSectionHasOwnValues,
} from "../../utils/calculateTotals";

const GOLD = "#d4af37";
const GOLD_DARK = "#b8960c";
const BLACK = "#1a1a1a";

const MIN_ROWS = 7;
const TABLE_BOTTOM = 163;

type Props = {
  quotation: Quotation;
  items: ExtendedItem[];
  totals: Totals;
};

type RenderRow =
  | {
      kind: "parent";
      sNo: number;
      item: ExtendedItem;
      showNumbers: boolean;
    }
  | {
      kind: "sub";
      item: ExtendedItem;
      section: SubSection;
    }
  | {
      kind: "empty";
    };

export const QuotationPreview = forwardRef<HTMLDivElement, Props>(
  ({ quotation, items, totals }, ref) => {
    const contentRows: RenderRow[] = [];

    items.forEach((item, index) => {
      const subSections = item.subSections ?? [];
      const sectionsWithNumbers = subSections.filter(subSectionHasOwnValues);
      const parentShowsNumbers = sectionsWithNumbers.length === 0;

      contentRows.push({
        kind: "parent",
        sNo: index + 1,
        item,
        showNumbers: parentShowsNumbers,
      });

      subSections.forEach((section) => {
        contentRows.push({
          kind: "sub",
          item,
          section,
        });
      });
    });

    const rowCount = Math.max(MIN_ROWS, contentRows.length);

    const tableRows: RenderRow[] = [
      ...contentRows,
      ...Array.from(
        { length: Math.max(0, rowCount - contentRows.length) },
        () => ({ kind: "empty" as const })
      ),
    ];

    const thStyle: CSSProperties = {
      border: `1px solid ${GOLD_DARK}`,
      padding: "6px 8px",
      background: `linear-gradient(135deg, ${GOLD} 0%, #c9a420 100%)`,
      color: BLACK,
      textAlign: "center",
      fontWeight: 900,
      fontSize: "10px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      verticalAlign: "middle",
      fontFamily: "Georgia, serif",
    };

    const tdBase: CSSProperties = {
      border: "1px solid #e8e0c8",
      padding: 0,
      textAlign: "center",
      fontSize: "12px",
      color: "#222",
      verticalAlign: "middle",
      fontFamily: "Georgia, serif",
    };

    const tdWhite: CSSProperties = { ...tdBase, background: "#ffffff" };
    const tdTint: CSSProperties = { ...tdBase, background: "#fffef8" };

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
          <img
            src="/aone-template.png"
            alt="A-One quotation template"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "93px",
                right: "98px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#111",
                letterSpacing: "0.5px",
                fontFamily: "Georgia, serif",
              }}
            >
              {quotation.date}
            </div>

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
                  fontWeight: 800,
                  color: GOLD_DARK,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "9px",
                  borderBottom: `1px solid ${GOLD}`,
                  paddingBottom: "5px",
                  fontFamily: "Georgia, serif",
                }}
              >
                Bill To
              </div>

              <div style={{ display: "flex", gap: "48px", marginBottom: "5px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    margin: 0,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  <strong style={{ color: BLACK }}>Client: </strong>
                  <span style={{ color: "#333" }}>{quotation.clientName}</span>
                </p>

                <p
                  style={{
                    fontSize: "14px",
                    margin: 0,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  <strong style={{ color: BLACK }}>Phone: </strong>
                  <span style={{ color: "#333" }}>{quotation.clientPhone}</span>
                </p>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  margin: 0,
                  fontFamily: "Georgia, serif",
                }}
              >
                <strong style={{ color: BLACK }}>Location: </strong>
                <span style={{ color: "#333" }}>
                  {quotation.clientLocation ?? ""}
                </span>
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                top: "355px",
                left: "40px",
                right: "40px",
                bottom: `${TABLE_BOTTOM}px`,
                border: `1.5px solid ${GOLD_DARK}`,
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  height: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                }}
              >
                <colgroup>
                  <col style={{ width: "38px" }} />
                  <col />
                  <col style={{ width: "76px" }} />
                  <col style={{ width: "86px" }} />
                  <col style={{ width: "100px" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th style={thStyle}>S.No</th>
                    <th
                      style={{
                        ...thStyle,
                        textAlign: "left",
                        paddingLeft: "14px",
                      }}
                    >
                      Description
                    </th>
                    <th style={thStyle}>Sq. Ft</th>
                    <th style={thStyle}>Rate</th>
                    <th style={thStyle}>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.map((row, index) => {
                    const cell = index % 2 === 0 ? tdWhite : tdTint;
                    const rowHeight = `${100 / rowCount}%`;

                    if (row.kind === "empty") {
                      return (
                        <tr key={`empty-${index}`} style={{ height: rowHeight }}>
                          <td style={{ ...cell, borderRight: "1px solid #e8e0c8" }} />
                          <td style={{ ...cell, borderRight: "1px solid #e8e0c8" }} />
                          <td style={{ ...cell, borderRight: "1px solid #e8e0c8" }} />
                          <td style={{ ...cell, borderRight: "1px solid #e8e0c8" }} />
                          <td style={cell} />
                        </tr>
                      );
                    }

                    if (row.kind === "parent") {
                      const amount = row.showNumbers ? itemAmount(row.item) : 0;
                      const sqFtValue = row.showNumbers ? row.item.packSize : "";
                      const rateValue =
                        row.showNumbers && row.item.unitPrice > 0
                          ? formatCurrency(row.item.unitPrice)
                          : "";

                      return (
                        <tr
                          key={`parent-${row.item.id}`}
                          style={{ height: rowHeight }}
                        >
                          <td
                            style={{
                              ...cell,
                              color: GOLD_DARK,
                              fontWeight: 800,
                              fontSize: "13px",
                              borderRight: "1px solid #e8e0c8",
                            }}
                          >
                            {row.sNo}
                          </td>

                          <td
                            style={{
                              ...cell,
                              textAlign: "left",
                              padding: "5px 10px 5px 14px",
                              borderRight: "1px solid #e8e0c8",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 900,
                                fontSize: "12px",
                                lineHeight: 1.25,
                                color: BLACK,
                                letterSpacing: "0.2px",
                              }}
                            >
                              {row.item.description}
                            </p>
                          </td>

                          <td
                            style={{
                              ...cell,
                              fontSize: "11.5px",
                              fontWeight: sqFtValue ? 800 : 400,
                              color: sqFtValue ? BLACK : "#d0c898",
                              borderRight: "1px solid #e8e0c8",
                              padding: "4px 5px",
                            }}
                          >
                            {sqFtValue}
                          </td>

                          <td
                            style={{
                              ...cell,
                              fontSize: "11.5px",
                              fontWeight: rateValue ? 700 : 400,
                              color: rateValue ? BLACK : "#d0c898",
                              borderRight: "1px solid #e8e0c8",
                              padding: "4px 5px",
                            }}
                          >
                            {rateValue}
                          </td>

                          <td
                            style={{
                              ...cell,
                              fontSize: "12px",
                              fontWeight: 900,
                              color: amount > 0 ? BLACK : "#d0c898",
                              padding: "4px 5px",
                            }}
                          >
                            {amount > 0 ? formatCurrency(amount) : ""}
                          </td>
                        </tr>
                      );
                    }

                    const section = row.section;
                    const hasOwnNumbers = subSectionHasOwnValues(section);
                    const amount = subSectionAmount(section);

                    return (
                      <tr
                        key={`sub-${row.item.id}-${section.id}`}
                        style={{ height: rowHeight }}
                      >
                        <td
                          style={{
                            ...cell,
                            borderRight: "1px solid #e8e0c8",
                            borderTop: "1px dashed #d8c87a",
                          }}
                        />

                        <td
                          style={{
                            ...cell,
                            textAlign: "left",
                            verticalAlign: "middle",
                            padding: "4px 10px 4px 22px",
                            borderRight: "1px solid #e8e0c8",
                            borderTop: "1px dashed #d8c87a",
                          }}
                        >
                          {section.heading && (
                            <span
                              style={{
                                fontWeight: 900,
                                fontSize: "10.5px",
                                color: BLACK,
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                                marginRight: "6px",
                              }}
                            >
                              {section.heading}
                            </span>
                          )}

                          {section.detail && (
                            <span
                              style={{
                                fontSize: "10.5px",
                                color: "#3a3a3a",
                                fontStyle: "italic",
                              }}
                            >
                              {section.detail}
                            </span>
                          )}
                        </td>

                        <td
                          style={{
                            ...cell,
                            fontSize: "11px",
                            fontWeight: hasOwnNumbers && section.sqFt ? 800 : 400,
                            color:
                              hasOwnNumbers && section.sqFt ? BLACK : "#d0c898",
                            borderRight: "1px solid #e8e0c8",
                            borderTop: "1px dashed #d8c87a",
                            padding: "4px 5px",
                          }}
                        >
                          {hasOwnNumbers && section.sqFt ? section.sqFt : ""}
                        </td>

                        <td
                          style={{
                            ...cell,
                            fontSize: "11px",
                            fontWeight: hasOwnNumbers && section.rate ? 700 : 400,
                            color:
                              hasOwnNumbers && section.rate ? BLACK : "#d0c898",
                            borderRight: "1px solid #e8e0c8",
                            borderTop: "1px dashed #d8c87a",
                            padding: "4px 5px",
                          }}
                        >
                          {hasOwnNumbers && section.rate
                            ? formatCurrency(section.rate)
                            : ""}
                        </td>

                        <td
                          style={{
                            ...cell,
                            fontSize: "11.5px",
                            fontWeight: 900,
                            color: amount > 0 ? BLACK : "#d0c898",
                            borderTop: "1px dashed #d8c87a",
                            padding: "4px 5px",
                          }}
                        >
                          {amount > 0 ? formatCurrency(amount) : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr style={{ height: "44px" }}>
                    <td
                      colSpan={2}
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: `1px solid ${GOLD_DARK}`,
                        background: "linear-gradient(to right, #fafafa, #f5f0e0)",
                        padding: "0 16px",
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#bba840",
                          fontStyle: "italic",
                          letterSpacing: "0.5px",
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        Thank you for your business
                      </span>
                    </td>

                    <td
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: `1px solid ${GOLD_DARK}`,
                        borderLeft: `1px solid ${GOLD_DARK}`,
                        background: "#fafaf5",
                        padding: "4px 2px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 1px 0",
                          fontSize: "8px",
                          fontWeight: 800,
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        Total Sq Ft
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: 900,
                          color: BLACK,
                          lineHeight: 1.1,
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        {totals.totalSqFt > 0
                          ? totals.totalSqFt.toLocaleString("en-PK")
                          : "—"}
                      </p>
                    </td>

                    <td
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderRight: `1px solid ${GOLD_DARK}`,
                        borderLeft: `1px solid ${GOLD_DARK}`,
                        background: "#fafaf5",
                        padding: "4px 8px",
                      }}
                    />

                    <td
                      style={{
                        borderTop: `2px solid ${GOLD_DARK}`,
                        borderLeft: `1px solid ${GOLD_DARK}`,
                        background: `linear-gradient(145deg, ${GOLD} 0%, #e8c84a 40%, #c9a420 100%)`,
                        padding: "4px 8px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 1px 0",
                          fontSize: "8px",
                          fontWeight: 800,
                          color: "#5a4000",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        Total Amount
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          fontWeight: 900,
                          color: BLACK,
                          letterSpacing: "0.3px",
                          lineHeight: 1.1,
                          fontFamily: "Georgia, serif",
                        }}
                      >
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