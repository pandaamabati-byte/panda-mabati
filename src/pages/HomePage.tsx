import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, ShieldCheck, Truck } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Make informed choices',
    description: 'Explore product specifications and compare roofing options.',
  },
  {
    icon: Calculator,
    title: 'Plan your materials',
    description: 'Use the roofing calculator as its supported calculations become available.',
  },
  {
    icon: Truck,
    title: 'Request a quotation',
    description: 'Share your project requirements so the team can follow up.',
  },
]

export function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              Roofing made clearer
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Build with confidence. Start with the right roof.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100">
              Explore roofing options, plan your materials and request a quotation
              for your next project with Panda Mabati.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-bold text-emerald-950 hover:bg-amber-300">
                Explore products <ArrowRight size={18} />
              </Link>
              <Link to="/quote" className="rounded-full border border-emerald-300 px-6 py-3 font-semibold text-white hover:bg-emerald-900">
                Request a quote
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">Your project, your plan</p>
            <div className="mt-7 space-y-5">
              {benefits.map(({ icon: Icon, title, description }, index) => (
                <div key={title} className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="font-bold">{index + 1}. {title}</h2>
                    <p className="mt-1 text-sm leading-6 text-emerald-100">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">A better starting point</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          The information you need, before you buy.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          We are building a practical roofing platform with product information,
          transparent verified pricing and a clearer path to a project quotation.
        </p>
      </section>
    </>
  )
}
