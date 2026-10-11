import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">404</p>
      <h1 className="mt-3 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you requested does not exist.</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-emerald-800 underline">Return home</Link>
    </section>
  )
}
