import { Link } from 'react-router-dom'

export function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">Get in touch</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Let's discuss your roofing project.</h1>
      <p className="mt-5 leading-7 text-slate-600">
        Contact and enquiry channels will be published after the official
        business details are verified.
      </p>
      <Link to="/quote" className="mt-6 inline-flex rounded-full bg-emerald-900 px-5 py-3 font-semibold text-white hover:bg-emerald-800">
        Start a quote request
      </Link>
    </section>
  )
}
