import { Link } from 'react-router-dom'

export function ProductsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Catalogue</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Roofing products</h1>
      <p className="mt-5 max-w-2xl leading-7 text-slate-600">
        The catalogue will load verified product details, available variants and
        pricing from the product service. No sample prices are presented as real.
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8">
        <h2 className="font-bold">Product catalogue setup in progress</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Products will appear here after the Firestore collection and product
          management workflow are configured.
        </p>
        <Link to="/quote" className="mt-5 inline-block font-semibold text-emerald-800 underline">
          Tell us about your project
        </Link>
      </div>
    </section>
  )
}
