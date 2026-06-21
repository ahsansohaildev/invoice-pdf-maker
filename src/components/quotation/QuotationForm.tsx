import { Download, LogOut } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { QuotationItems } from "./QuotationItems";
import type { ExtendedItem, Quotation } from "../../types/quotation";

type Props = {
  quotation: Quotation;
  items: ExtendedItem[];
  setQuotation: Dispatch<SetStateAction<Quotation>>;
  setItems: Dispatch<SetStateAction<ExtendedItem[]>>;
  onDownload: () => void;
  onLogout: () => void;
};

export function QuotationForm({
  quotation,
  items,
  setQuotation,
  setItems,
  onDownload,
  onLogout,
}: Props) {
  function update<K extends keyof Quotation>(key: K, value: Quotation[K]) {
    setQuotation((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <aside className="flex h-screen flex-col bg-white shadow-xl">
      <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between bg-[#1a1a1a] px-6 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#d4af37]">
            A-One Aluminum & Glass
          </p>
          <h2 className="text-lg font-black leading-tight text-white">
            AHSAN-DEVELOPER
          </h2>
        </div>

        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="rounded-lg bg-white/10 p-2.5 text-slate-400 transition hover:bg-white/20 hover:text-white"
        >
          <LogOut size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-1 overflow-auto px-5 py-5">
        <Section title="📄 Quote Info">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Quote No.">
              <input
                value={quotation.quoteNumber}
                onChange={(e) => update("quoteNumber", e.target.value)}
                className={inputCls}
                placeholder="e.g. 001"
              />
            </Field>

            <Field label="Date">
              <input
                value={quotation.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputCls}
                placeholder="23/03/2026"
              />
            </Field>

            <Field label="Valid Until">
              <input
                value={quotation.validUntil}
                onChange={(e) => update("validUntil", e.target.value)}
                className={inputCls}
                placeholder="30/03/2026"
              />
            </Field>
          </div>
        </Section>

        <Section title="👤 Client Info">
          <Field label="Client Name">
            <input
              value={quotation.clientName}
              onChange={(e) => update("clientName", e.target.value)}
              className={inputCls}
              placeholder="Full name"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone No.">
              <input
                value={quotation.clientPhone}
                onChange={(e) => update("clientPhone", e.target.value)}
                className={inputCls}
                placeholder="0300-0000000"
              />
            </Field>

            <Field label="City / Location">
              <input
                value={quotation.clientLocation ?? ""}
                onChange={(e) => update("clientLocation", e.target.value)}
                className={inputCls}
                placeholder="e.g. Lahore"
              />
            </Field>
          </div>
        </Section>

        <Section title="🏠 Work Items">
          <div className="mb-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
           Set SQ.FT/Rate on the item, or add SQ.FT/Rate on individual sub-sections.
          </div>

          <QuotationItems items={items} setItems={setItems} />
        </Section>

        <Section title="✍️ Sign Off">
          <Field label="Prepared By">
            <input
              value={quotation.preparedBy}
              onChange={(e) => update("preparedBy", e.target.value)}
              className={inputCls}
              placeholder="Your name"
            />
          </Field>

          <Field label="Terms & Conditions">
            <textarea
              rows={4}
              value={quotation.terms}
              onChange={(e) => update("terms", e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="e.g. 50% advance required. Work starts after confirmation..."
            />
          </Field>
        </Section>

        <Section title="💰 Payment Summary">
  <Field label="Advance Payment">
    <input
      type="number"
      min="0"
      value={quotation.advancePayment ?? ""}
      onChange={(e) =>
        update("advancePayment", Number(e.target.value || 0))
      }
      className={inputCls}
      placeholder="e.g. 5000"
    />
  </Field>
</Section>

        <button
          type="button"
          onClick={onDownload}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-4 text-sm font-black text-[#1a1a1a] shadow-lg transition hover:bg-[#c9a227] active:scale-[0.98]"
        >
          <Download size={18} />
          Download A4 PDF
        </button>

        <p className="pb-4 text-center text-[10px] text-slate-400">
          Exports as A4 · Professional PDF
        </p>
      </div>
    </aside>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm " +
  "text-slate-800 outline-none focus:border-amber-400 focus:ring-2 " +
  "focus:ring-amber-100 transition placeholder:text-slate-300";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-3 mt-2 flex items-center gap-2">
        <div className="h-[3px] w-5 rounded-full bg-[#d4af37]" />
        <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-600">
          {title}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-3 last:mb-0">
      <label className="mb-1.5 block text-[11px] font-black uppercase tracking-wider text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}