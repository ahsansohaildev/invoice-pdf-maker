import { Plus, Trash2 } from "lucide-react";
import type { QuotationItem } from "../../types/quotation";

const MAX_ITEMS = 7;

type Props = {
  items: QuotationItem[];
  setItems: React.Dispatch<React.SetStateAction<QuotationItem[]>>;
};

export function QuotationItems({ items, setItems }: Props) {
  function updateItem<K extends keyof QuotationItem>(
    id: string,
    key: K,
    value: QuotationItem[K]
  ) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  }

  function addItem() {
    if (items.length >= MAX_ITEMS) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        description: "",
        packSize: "",
        qty: 1,
        unitPrice: 0,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const total = Number(item.qty || 0) * Number(item.unitPrice || 0);

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* ── Item Header ── */}
            <div className="flex items-center justify-between bg-[#1a1a1a] px-4 py-2.5">
              <div className="flex items-center gap-2.5">
                {/* Gold number badge */}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-black text-[#1a1a1a]">
                  {index + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Work Item
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-2.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/30 transition"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>

            {/* ── Item Body ── */}
            <div className="p-4">
              {/* Description — full width */}
              <div className="mb-3">
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Work Description
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="e.g. False Ceiling (Gypsum/POP), Aluminum Partition, Glass Work..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5
                             text-sm text-slate-800 placeholder:text-slate-300
                             outline-none focus:border-amber-400 focus:bg-white
                             focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              {/* ── 3 Inputs + Auto Total ── */}
              <div className="grid grid-cols-4 gap-2">

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
                    placeholder="450"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5
                               text-center text-sm text-slate-800 placeholder:text-slate-300
                               outline-none focus:border-amber-400 focus:bg-white transition"
                  />
                  <p className="mt-1 text-center text-[9px] text-slate-400">
                    Area / کتنا
                  </p>
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
                  <p className="mt-1 text-center text-[9px] text-slate-400">
                    تعداد
                  </p>
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
                  <p className="mt-1 text-center text-[9px] text-slate-400">
                    فی یونٹ
                  </p>
                </div>

                {/* Auto Total (read-only) */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-[#b8960c]">
                    Total ✓
                  </label>
                  <div
                    className="flex h-[42px] items-center justify-center rounded-xl
                               border border-amber-200 bg-amber-50 px-2
                               text-sm font-black text-[#1a1a1a]"
                  >
                    {total.toLocaleString("en-PK")}
                  </div>
                  <p className="mt-1 text-center text-[9px] font-semibold text-[#b8960c]">
                    خودکار
                  </p>
                </div>
              </div>
            </div>
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