import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { QuotationItem } from "../../types/quotation";

const MAX_ITEMS = 7;

export type SubSection = {
  id: string;
  heading: string;
  detail: string;
};

export type ExtendedItem = QuotationItem & {
  subSections: SubSection[];
};

type Props = {
  items: ExtendedItem[];
  setItems: React.Dispatch<React.SetStateAction<ExtendedItem[]>>;
};

export function QuotationItems({ items, setItems }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function updateItem<K extends keyof ExtendedItem>(
    id: string,
    key: K,
    value: ExtendedItem[K]
  ) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  }

  function addSection(itemId: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subSections: [
                ...(item.subSections ?? []),
                { id: crypto.randomUUID(), heading: "", detail: "" },
              ],
            }
          : item
      )
    );
  }

  function updateSection(
    itemId: string,
    secId: string,
    key: "heading" | "detail",
    value: string
  ) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subSections: (item.subSections ?? []).map((s) =>
                s.id === secId ? { ...s, [key]: value } : s
              ),
            }
          : item
      )
    );
  }

  function removeSection(itemId: string, secId: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subSections: (item.subSections ?? []).filter((s) => s.id !== secId),
            }
          : item
      )
    );
  }

  function addItem() {
    if (items.length >= MAX_ITEMS) return;
    const newId = crypto.randomUUID();
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        description: "",
        packSize: "",
        qty: 1,
        unitPrice: 0,
        subSections: [],  // ← always initialized
      },
    ]);
    setExpanded((prev) => ({ ...prev, [newId]: true }));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const subSections = item.subSections ?? []; // ← safe fallback
        const total = Number(item.qty || 0) * Number(item.unitPrice || 0);
        const isOpen = expanded[item.id] ?? true;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* ── Item Header ── */}
            <div
              className="flex items-center justify-between bg-[#1a1a1a] px-4 py-2.5 cursor-pointer select-none"
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-black text-[#1a1a1a]">
                  {index + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  {item.description || "Work Item"}
                </span>
                {total > 0 && (
                  <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[10px] font-black text-[#d4af37]">
                    {total.toLocaleString("en-PK")} PKR
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-2.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/30 transition"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
                {isOpen ? (
                  <ChevronUp size={16} className="text-slate-400" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400" />
                )}
              </div>
            </div>

            {/* ── Item Body ── */}
            {isOpen && (
              <div className="p-4 space-y-4">

                {/* ── Main Description ── */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Main Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    placeholder="e.g. Aluminum Company (PREMIUM) Gauge 1.2MM, Black Colour With Collar, Single Glazed."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                               text-sm text-slate-800 placeholder:text-slate-300
                               outline-none focus:border-amber-400 focus:bg-white
                               focus:ring-2 focus:ring-amber-100 transition"
                  />
                </div>

                {/* ── Sub-Sections ── */}
                {subSections.length > 0 && (
                  <div className="space-y-2 border-l-2 border-amber-200 pl-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">
                      Sub-Sections
                    </p>
                    {subSections.map((sec) => (
                      <div
                        key={sec.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-2"
                      >
                        <div className="flex gap-2 items-start">
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={sec.heading}
                              onChange={(e) =>
                                updateSection(item.id, sec.id, "heading", e.target.value)
                              }
                              placeholder="Sub-heading (e.g. Section, Glass, Hardware)"
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2
                                         text-sm font-bold text-slate-800 placeholder:text-slate-300
                                         outline-none focus:border-amber-400 transition"
                            />
                            <textarea
                              rows={2}
                              value={sec.detail}
                              onChange={(e) =>
                                updateSection(item.id, sec.id, "detail", e.target.value)
                              }
                              placeholder="Detail text (e.g. Width 100 MM, Height 30 MM.)"
                              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2
                                         text-sm text-slate-600 placeholder:text-slate-300
                                         outline-none focus:border-amber-400 transition"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSection(item.id, sec.id)}
                            className="mt-1 rounded-lg bg-red-50 p-1.5 text-red-400 hover:bg-red-100 transition"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Sub-section button */}
                <button
                  type="button"
                  onClick={() => addSection(item.id)}
                  className="flex items-center gap-1.5 rounded-xl border border-dashed border-amber-300
                             bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700
                             hover:bg-amber-100 transition"
                >
                  <Plus size={13} />
                  Add Sub-section (Section / Glass / Hardware…)
                </button>

                {/* ── 3 Inputs + Auto Total ── */}
                <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100">

                  {/* Sq. Ft */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Sq. Ft
                    </label>
                    <input
                      type="text"
                      value={item.packSize}
                      onChange={(e) =>
                        updateItem(item.id, "packSize", e.target.value)
                      }
                      placeholder="100"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5
                                 text-center text-sm text-slate-800 placeholder:text-slate-300
                                 outline-none focus:border-amber-400 focus:bg-white transition"
                    />
                    <p className="mt-1 text-center text-[9px] text-slate-400">Area / کتنا</p>
                  </div>

                  {/* Qty */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={String(item.qty)}
                      min="1"
                      onChange={(e) =>
                        updateItem(item.id, "qty", Number(e.target.value))
                      }
                      placeholder="1"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5
                                 text-center text-sm text-slate-800 placeholder:text-slate-300
                                 outline-none focus:border-amber-400 focus:bg-white transition"
                    />
                    <p className="mt-1 text-center text-[9px] text-slate-400">تعداد</p>
                  </div>

                  {/* Rate */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Rate (PKR)
                    </label>
                    <input
                      type="number"
                      value={String(item.unitPrice)}
                      min="0"
                      onChange={(e) =>
                        updateItem(item.id, "unitPrice", Number(e.target.value))
                      }
                      placeholder="0"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5
                                 text-center text-sm text-slate-800 placeholder:text-slate-300
                                 outline-none focus:border-amber-400 focus:bg-white transition"
                    />
                    <p className="mt-1 text-center text-[9px] text-slate-400">فی یونٹ</p>
                  </div>

                  {/* Auto Total */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-[#b8960c]">
                      Amount ✓
                    </label>
                    <div className="flex h-[42px] items-center justify-center rounded-xl
                                   border border-amber-200 bg-amber-50 px-2
                                   text-sm font-black text-[#1a1a1a]">
                      {total.toLocaleString("en-PK")}
                    </div>
                    <p className="mt-1 text-center text-[9px] font-semibold text-[#b8960c]">خودکار</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Add Item Button ── */}
      {items.length < MAX_ITEMS ? (
        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-2xl
                     border-2 border-dashed border-[#d4af37] bg-amber-50 py-3.5
                     font-black text-sm text-[#b8960c]
                     hover:bg-amber-100 transition"
        >
          <Plus size={18} />
          Add Work Item
          <span className="ml-1 text-[11px] font-normal text-slate-400">
            ({items.length} / {MAX_ITEMS})
          </span>
        </button>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 py-3
                        text-center text-sm font-bold text-amber-700">
          ✓ Maximum 7 items reached
        </div>
      )}
    </div>
  );
}