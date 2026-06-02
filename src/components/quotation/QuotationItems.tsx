import { Plus, Trash2 } from "lucide-react";
import type { QuotationItem } from "../../types/quotation";

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
    <div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <Input
              label="Item Description"
              value={item.description}
              onChange={(value) => updateItem(item.id, "description", value)}
            />

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Pack Size"
                value={item.packSize}
                onChange={(value) => updateItem(item.id, "packSize", value)}
              />

              <Input
                label="Qty"
                type="number"
                value={String(item.qty)}
                onChange={(value) => updateItem(item.id, "qty", Number(value))}
              />

              <Input
                label="Unit Price"
                type="number"
                value={String(item.unitPrice)}
                onChange={(value) =>
                  updateItem(item.id, "unitPrice", Number(value))
                }
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-3 font-black text-sky-700 hover:bg-sky-100"
      >
        <Plus size={18} />
        Add Item
      </button>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
      />
    </div>
  );
}