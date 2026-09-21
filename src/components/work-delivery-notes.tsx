type Props = {
  notes: readonly string[] | undefined;
};

/** Documented delivery facts on a case study — omit if nothing is real */
export function WorkDeliveryNotes({ notes }: Props) {
  if (!notes?.length) return null;

  return (
    <>
      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Approach
      </h2>
      <ul className="mt-6 space-y-3 text-slate-600">
        {notes.map((note) => (
          <li key={note} className="flex gap-2 leading-relaxed">
            <span
              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold-600"
              aria-hidden
            />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
