export function QuotePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Your project</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Request a quotation</h1>
      <p className="mt-5 leading-7 text-slate-600">
        The quote form will collect project requirements and validate them before
        sending anything to Firebase. Submission will be enabled after the
        quote service and security rules are ready.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold">Quote requests are being configured</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          No information has been submitted. The working form will be added in
          the quote-system milestone.
        </p>
      </div>
    </section>
  )
}
