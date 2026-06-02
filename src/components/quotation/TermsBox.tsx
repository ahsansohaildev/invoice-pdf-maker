type Props = {
  terms: string;
};

export function TermsBox({ terms }: Props) {
  return (
    <section className="pdf-terms">
      <h3>TERMS AND CONDITIONS</h3>

      <ul>
        {terms
          .split("\n")
          .filter(Boolean)
          .map((term, index) => (
            <li key={index}>{term}</li>
          ))}
      </ul>
    </section>
  );
}