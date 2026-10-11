import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Phone,
  MessageCircle,
  ArrowUpRight,
  House,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products', end: false },
  { to: '/calculator', label: 'Roof calculator', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

const socialItems = [
  { label: 'Facebook', mark: 'f' },
  { label: 'Instagram', mark: '◎' },
  { label: 'TikTok', mark: '♪' },
  { label: 'YouTube', mark: '▶' },
  { label: 'WhatsApp', mark: 'W' },
  { label: 'LinkedIn', mark: 'in' },
]

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-emerald-950">
            Panda <span className="text-amber-600">Mabati</span>
          </Link>

          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'text-emerald-800' : 'text-slate-600 hover:text-emerald-800'
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/quote"
              className="rounded-full bg-emerald-900 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-20 overflow-hidden bg-[#0D2D24] text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9F078] text-[#12352B]">
                  <House size={25} strokeWidth={2.2} />
                </span>
                <span className="text-2xl font-extrabold tracking-tight">
                  Panda <span className="text-[#D9F078]">Mabati</span>
                </span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-emerald-100/75">
                Roofing solutions for homes and businesses. Explore our
                roofing profiles and talk to our team about your next project.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9F078] px-5 py-3 text-sm font-bold text-[#12352B] transition hover:bg-[#e5f79d]"
              >
                Explore roofing products
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#D9F078]">
                Quick links
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-emerald-50/80">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="transition hover:text-[#D9F078]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/quote" className="transition hover:text-[#D9F078]">
                    Request a quote
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#D9F078]">
                Contact our team
              </h2>

              <p className="mt-5 text-lg font-bold">John Mwasi</p>
              <p className="mt-1 text-sm text-emerald-100/65">
                Customer enquiries
              </p>

              <a
                href="tel:+254713207844"
                className="mt-5 inline-flex items-center gap-3 text-sm font-semibold transition hover:text-[#D9F078]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Phone size={18} />
                </span>
                0713 207 844
              </a>

              <a
                href="https://wa.me/254713207844"
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex w-fit items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-emerald-50 transition hover:border-[#D9F078] hover:text-[#D9F078]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold">Follow Panda Mabati</h2>
                <p className="mt-1 text-xs leading-5 text-emerald-100/60">
                  Our official social links will be added soon.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {socialItems.map(({ label, mark }) => (
                  <span
                    key={label}
                    title={`${label} link coming soon`}
                    aria-label={`${label} link coming soon`}
                    className="flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-emerald-50/80"
                  >
                    {mark}
                  </span>
                ))}
                <span
                  title="X link coming soon"
                  aria-label="X link coming soon"
                  className="flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-emerald-50/80"
                >
                  X
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#09241C]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-emerald-100/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} Panda Mabati. All rights reserved.</p>
            <p>Product prices and availability are confirmed by our team.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
