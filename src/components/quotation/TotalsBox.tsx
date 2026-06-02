import type { Totals } from "../../types/quotation";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  totals: Totals;
};

export function TotalsBox({ totals }: Props) {
  return (
    <section className="pdf-totals">
      <TotalRow label="Subtotal" value={totals.subtotal} />
      <TotalRow label="Tax" value={totals.tax} />
      <TotalRow label="Total Amount" value={totals.total} strong />
    </section>
  );
}

function TotalRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="pdf-total-row">
      <div className={strong ? "pdf-total-label strong" : "pdf-total-label"}>
        {label}
      </div>

      <div className="pdf-total-value">{formatCurrency(value)}</div>
    </div>
  );
}