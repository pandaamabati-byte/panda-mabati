import { Link } from 'react-router-dom'

export function CalculatorPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Planning tool</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Roofing calculator</h1>
      <p className="mt-5 max-w-2xl leading-7 text-slate-600">
        The calculation engine will be implemented and tested separately from
        this page. Material estimates will depend on roof geometry and verified
        product specifications.
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="font-bold">Calculator engine not yet enabled</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          We will enable estimates after the supported roof inputs, coverage
          widths, overlap allowances and calculation tests are in place.
        </p>
        <Link to="/quote" className="mt-5 inline-block font-semibold text-emerald-800 underline">
          Request a project quotation
        </Link>
      </div>
    </section>
  )
}
