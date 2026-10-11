import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products', end: false },
  { to: '/calculator', label: 'Roof calculator', end: false },
  { to: '/contact', label: 'Contact', end: false },
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

      <footer className="mt-20 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-slate-600 sm:px-8">
          <span className="font-semibold text-emerald-950">Panda Mabati</span>
          <span>Roofing products, material estimates and quote requests.</span>
          <span>Product prices and availability will be published only when verified.</span>
        </div>
      </footer>
    </div>
  )
}
