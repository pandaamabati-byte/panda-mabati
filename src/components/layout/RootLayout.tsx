import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Phone,
  MessageCircle,
  ArrowUpRight,
  House,
  Package,
  Mail,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products', end: false },
  { to: '/calculator', label: 'Roof calculator', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

const socialItems = [
  { label: 'Facebook', mark: 'f', href: 'https://www.facebook.com/' },
  { label: 'Instagram', mark: '◎', href: 'https://www.instagram.com/' },
  { label: 'TikTok', mark: '♪', href: 'https://www.tiktok.com/' },
  { label: 'YouTube', mark: '▶', href: 'https://www.youtube.com/' },
  { label: 'WhatsApp', mark: 'W', href: 'https://www.whatsapp.com/' },
  { label: 'LinkedIn', mark: 'in', href: 'https://www.linkedin.com/' },
  { label: 'X', mark: 'X', href: 'https://x.com/' },
]

const currentYear = new Date().getFullYear()

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            to="/"
            aria-label="Panda Mabati home"
            className="text-xl font-extrabold tracking-tight text-emerald-950"
          >
            Panda <span className="text-amber-600">Mabati</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700',
                    isActive
                      ? 'font-bold text-emerald-900'
                      : 'text-slate-600 hover:text-emerald-800',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/quote"
              className="rounded-full bg-emerald-900 px-4 py-2 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="relative mt-20 overflow-hidden bg-[#0D2D24] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D9F078] via-emerald-400 to-[#D9F078]"
        />

        <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
            <section className="lg:col-span-5" aria-labelledby="footer-brand">
              <Link
                to="/"
                aria-label="Panda Mabati home"
                className="inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F078]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9F078] text-[#12352B] shadow-lg shadow-black/10">
                  <House size={25} strokeWidth={2.2} />
                </span>
                <span
                  id="footer-brand"
                  className="text-2xl font-extrabold tracking-tight sm:text-3xl"
                >
                  Panda <span className="text-[#D9F078]">Mabati</span>
                </span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-emerald-100/75">
                Roofing solutions for homes and businesses. Discover roofing
                profiles, compare your options and talk to our team about your
                next project.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9F078] px-5 py-3 text-sm font-bold text-[#12352B] shadow-sm transition hover:bg-[#e5f79d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
              >
                Explore roofing products
                <ArrowUpRight size={17} />
              </Link>

              <p className="mt-6 text-xs leading-5 text-emerald-100/55">
                Helping you move from roofing ideas to your next project.
              </p>
            </section>

            <section className="lg:col-span-3" aria-labelledby="footer-links">
              <h2
                id="footer-links"
                className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D9F078]"
              >
                Explore
              </h2>

              <ul className="mt-5 space-y-3.5 text-sm text-emerald-50/80">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-2 transition-colors hover:text-[#D9F078] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F078]"
                    >
                      <ChevronRight
                        size={14}
                        className="text-[#D9F078]/70 transition-transform group-hover:translate-x-0.5"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/quote"
                    className="group inline-flex items-center gap-2 transition-colors hover:text-[#D9F078] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F078]"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#D9F078]/70 transition-transform group-hover:translate-x-0.5"
                    />
                    Request a quote
                  </Link>
                </li>
              </ul>

              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D9F078]/10 text-[#D9F078]">
                    <Package size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Need help choosing?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-100/60">
                      Explore our products or ask our team for guidance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="lg:col-span-4" aria-labelledby="footer-contact">
              <h2
                id="footer-contact"
                className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D9F078]"
              >
                Talk to our team
              </h2>

              <p className="mt-5 text-xl font-bold tracking-tight">
                John Mwasi
              </p>
              <p className="mt-1 text-sm text-emerald-100/65">
                Customer enquiries
              </p>

              <a
                href="tel:+254713207844"
                className="mt-5 flex w-fit items-center gap-3 rounded-xl transition hover:text-[#D9F078] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F078]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block text-[11px] text-emerald-100/55">
                    Call our team
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold">
                    0713 207 844
                  </span>
                </span>
              </a>

              <a
                href="https://wa.me/254713207844"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-emerald-50 transition hover:border-[#D9F078] hover:bg-[#D9F078]/10 hover:text-[#D9F078] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9F078]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
                <ArrowUpRight size={15} />
              </a>

              <Link
                to="/contact"
                className="mt-4 flex w-fit items-center gap-2 text-sm font-semibold text-emerald-100/75 transition hover:text-[#D9F078] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9F078]"
              >
                <Mail size={15} />
                More contact options
                <ArrowUpRight size={14} />
              </Link>
            </section>
          </div>

          <section
            aria-labelledby="footer-social"
            className="mt-12 border-t border-white/15 pt-7 sm:mt-14 sm:pt-8"
          >
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="max-w-md">
                <h2 id="footer-social" className="text-sm font-bold">
                  Connect with Panda Mabati
                </h2>
                <p className="mt-1 text-xs leading-5 text-emerald-100/60">
                  Visit your favourite social platforms and connect with us.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {socialItems.map(({ label, mark, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${label}`}
                    title={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-sm font-bold text-emerald-50/85 transition duration-200 hover:-translate-y-0.5 hover:border-[#D9F078] hover:bg-[#D9F078] hover:text-[#12352B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D9F078]"
                  >
                    <span aria-hidden="true">{mark}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-white/10 bg-[#09241C]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-emerald-100/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {currentYear} Panda Mabati. All rights reserved.
            </p>
            <p className="leading-5">
              Product prices and availability are confirmed by our team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
