import { Download, LogOut } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { QuotationItems } from "./QuotationItems";
import type { Quotation, QuotationItem } from "../../types/quotation";

type Props = {
  quotation: Quotation;
  items: QuotationItem[];
  setQuotation: Dispatch<SetStateAction<Quotation>>;
  setItems: Dispatch<SetStateAction<QuotationItem[]>>;
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
  function updateQuotation<K extends keyof Quotation>(
    key: K,
    value: Quotation[K]
  ) {
    setQuotation((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <aside className="h-screen overflow-auto border-r border-slate-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Quotation Form
          </h2>
          <p className="text-sm text-slate-500">
            Fill data and download A4 PDF.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-slate-100 p-3 text-slate-600 hover:bg-slate-200"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Quotation No."
          value={quotation.quoteNumber}
          onChange={(value) => updateQuotation("quoteNumber", value)}
        />

        <Input
          label="Date"
          value={quotation.date}
          onChange={(value) => updateQuotation("date", value)}
        />

        <Input
          label="Valid Until"
          value={quotation.validUntil}
          onChange={(value) => updateQuotation("validUntil", value)}
        />

        <Input
          label="Client Name"
          value={quotation.clientName}
          onChange={(value) => updateQuotation("clientName", value)}
        />

        <Input
          label="Client Phone"
          value={quotation.clientPhone}
          onChange={(value) => updateQuotation("clientPhone", value)}
        />

        <Input
          label="Client Email"
          value={quotation.clientEmail}
          onChange={(value) => updateQuotation("clientEmail", value)}
        />
      </div>

      <SectionTitle title="Company Details" />

      <Input
        label="Company Name"
        value={quotation.companyName}
        onChange={(value) => updateQuotation("companyName", value)}
      />

      <Input
        label="Company Address"
        value={quotation.companyAddress}
        onChange={(value) => updateQuotation("companyAddress", value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Company Phone"
          value={quotation.companyPhone}
          onChange={(value) => updateQuotation("companyPhone", value)}
        />

        <Input
          label="Company Email"
          value={quotation.companyEmail}
          onChange={(value) => updateQuotation("companyEmail", value)}
        />
      </div>

      <SectionTitle title="Items" />

      <QuotationItems items={items} setItems={setItems} />

      <SectionTitle title="Final Details" />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Tax"
          type="number"
          value={String(quotation.tax)}
          onChange={(value) => updateQuotation("tax", Number(value))}
        />

        <Input
          label="Prepared By"
          value={quotation.preparedBy}
          onChange={(value) => updateQuotation("preparedBy", value)}
        />

        <Input
          label="Designation"
          value={quotation.designation}
          onChange={(value) => updateQuotation("designation", value)}
        />
      </div>

      <label className="mb-2 mt-4 block text-sm font-black text-slate-700">
        Terms and Conditions
      </label>

      <textarea
        rows={6}
        value={quotation.terms}
        onChange={(event) => updateQuotation("terms", event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500"
      />

      <button
        type="button"
        onClick={onDownload}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 font-black text-white shadow-lg hover:bg-slate-800"
      >
        <Download size={18} />
        Download A4 PDF
      </button>
    </aside>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="mb-3 mt-7 text-lg font-black text-sky-700">{title}</h3>
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
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500"
      />
    </div>
  );
}