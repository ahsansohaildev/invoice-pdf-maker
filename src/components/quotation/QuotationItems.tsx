import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ExtendedItem, SubSection } from "../../types/quotation";
import {
  itemAmount,
  itemSqFt,
  subSectionAmount,
  subSectionHasOwnValues,
} from "../../utils/calculateTotals";

const MAX_ITEMS = 7;

type Props = {
  items: ExtendedItem[];
  setItems: Dispatch<SetStateAction<ExtendedItem[]>>;
};

function makeId() {
  return crypto.randomUUID();
}

function numberOrUndefined(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

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

  function addItem() {
    if (items.length >= MAX_ITEMS) return;

    const id = makeId();

    setItems((prev) => [
      ...prev,
      {
        id,
        description: "",
        packSize: "",
        qty: 1,
        unitPrice: 0,
        subSections: [],
      },
    ]);

    setExpanded((prev) => ({ ...prev, [id]: true }));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function addSection(itemId: string) {
    const newSection: SubSection = {
      id: makeId(),
      heading: "",
      detail: "",
      sqFt: undefined,
      rate: undefined,
    };

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subSections: [...(item.subSections ?? []), newSection],
            }
          : item
      )
    );
  }

  function updateSection<K extends keyof SubSection>(
    itemId: string,
    sectionId: string,
    key: K,
    value: SubSection[K]
  ) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subSections: (item.subSections ?? []).map((section) =>
                section.id === sectionId
                  ? { ...section, [key]: value }
                  : section
              ),
            }
          : item
      )
    );
  }

  function removeSection(itemId: string, sectionId: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              subSections: (item.subSections ?? []).filter(
                (section) => section.id !== sectionId
              ),
            }
          : item
      )
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const subSections = item.subSections ?? [];
        const hasOwnSubValues = subSections.some(subSectionHasOwnValues);
        const total = itemAmount(item);
        const sqFt = itemSqFt(item);
        const isOpen = expanded[item.id] ?? true;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div
              className="flex cursor-pointer select-none items-center justify-between bg-[#1a1a1a] px-4 py-2.5"
              onClick={() => toggle(item.id)}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-xs font-black text-[#1a1a1a]">
                  {index + 1}
                </span>

                <span className="truncate text-xs font-bold uppercase tracking-widest text-slate-300">
                  {item.description || "Work Item"}
                </span>

                {sqFt > 0 && (
                  <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black text-slate-300">
                    {sqFt.toLocaleString("en-PK")} SQ.FT
                  </span>
                )}

                {total > 0 && (
                  <span className="shrink-0 rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[10px] font-black text-[#d4af37]">
                    {total.toLocaleString("en-PK")} PKR
                  </span>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-2.5 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500/30"
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

            {isOpen && (
              <div className="space-y-4 p-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    placeholder="e.g. Aluminum Sliding Window"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 border-t border-slate-100 pt-1">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                      SQ.FT / Qty
                    </label>
                    <input
                      type="text"
                      value={item.packSize}
                      disabled={hasOwnSubValues}
                      onChange={(e) =>
                        updateItem(item.id, "packSize", e.target.value)
                      }
                      placeholder="100"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Unit
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      disabled={hasOwnSubValues}
                      onChange={(e) =>
                        updateItem(item.id, "qty", Number(e.target.value))
                      }
                      placeholder="1"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Rate
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={item.unitPrice === 0 ? "" : item.unitPrice}
                      disabled={hasOwnSubValues}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "unitPrice",
                          Number(e.target.value || 0)
                        )
                      }
                      placeholder="2500"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-center text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-[#b8960c]">
                      Amount
                    </label>
                    <div className="flex h-[42px] items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-2 text-sm font-black text-[#1a1a1a]">
                      {total > 0 ? total.toLocaleString("en-PK") : "0"}
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-[#d4af37] pl-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                      Sub-sections
                    </p>
                    <button
                      type="button"
                      onClick={() => addSection(item.id)}
                      className="rounded-lg border border-dashed border-orange-300 px-3 py-1.5 text-xs font-bold text-orange-600 transition hover:bg-orange-50"
                    >
                      <Plus size={13} className="mr-1 inline" />
                      Add Sub-section
                    </button>
                  </div>

                  {subSections.length === 0 ? (
                    <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-400">
                      No sub-section added. Parent SQ.FT/Rate will be used.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {subSections.map((section) => {
                        const sectionHasNumbers =
                          subSectionHasOwnValues(section);
                        const sectionAmount = subSectionAmount(section);

                        return (
                          <div
                            key={section.id}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                          >
                            <div className="mb-2 flex gap-2">
                              <input
                                type="text"
                                value={section.heading}
                                onChange={(e) =>
                                  updateSection(
                                    item.id,
                                    section.id,
                                    "heading",
                                    e.target.value
                                  )
                                }
                                placeholder="Section / Glass / Hardware"
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeSection(item.id, section.id)
                                }
                                className="rounded-lg bg-red-50 p-2 text-red-400 transition hover:bg-red-100"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <textarea
                              rows={2}
                              value={section.detail}
                              onChange={(e) =>
                                updateSection(
                                  item.id,
                                  section.id,
                                  "detail",
                                  e.target.value
                                )
                              }
                              placeholder="Detail text e.g. Width 100 MM, Height 30 MM"
                              className="mb-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400"
                            />

                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="mb-1 block text-[9px] font-black uppercase tracking-widest text-slate-500">
                                  SQ.FT / Qty
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  value={section.sqFt ?? ""}
                                  onChange={(e) =>
                                    updateSection(
                                      item.id,
                                      section.id,
                                      "sqFt",
                                      numberOrUndefined(e.target.value)
                                    )
                                  }
                                  placeholder="100"
                                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-center text-sm outline-none focus:border-amber-400"
                                />
                              </div>

                              <div>
                                <label className="mb-1 block text-[9px] font-black uppercase tracking-widest text-slate-500">
                                  Rate
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  value={section.rate ?? ""}
                                  onChange={(e) =>
                                    updateSection(
                                      item.id,
                                      section.id,
                                      "rate",
                                      numberOrUndefined(e.target.value)
                                    )
                                  }
                                  placeholder="2500"
                                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-center text-sm outline-none focus:border-amber-400"
                                />
                              </div>

                              <div>
                                <label className="mb-1 block text-[9px] font-black uppercase tracking-widest text-[#b8960c]">
                                  Amount
                                </label>
                                <div className="flex h-[38px] items-center justify-center rounded-lg border border-amber-200 bg-amber-50 px-2 text-sm font-black text-[#1a1a1a]">
                                  {sectionHasNumbers && sectionAmount > 0
                                    ? sectionAmount.toLocaleString("en-PK")
                                    : "0"}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {items.length < MAX_ITEMS ? (
        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d4af37] bg-amber-50 py-3.5 text-sm font-black text-[#b8960c] transition hover:bg-amber-100"
        >
          <Plus size={18} />
          Add Work Item
          <span className="ml-1 text-[11px] font-normal text-slate-400">
            ({items.length} / {MAX_ITEMS})
          </span>
        </button>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 py-3 text-center text-sm font-bold text-amber-700">
          Maximum 7 items reached
        </div>
      )}
    </div>
  );
}