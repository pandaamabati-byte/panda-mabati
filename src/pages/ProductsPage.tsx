import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  loadProducts,
  type CatalogueSource,
} from '../services/products/catalogue'
import type { Product } from '../features/products/productModel'

const formatKes = (amount: number) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount)

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [source, setSource] = useState<CatalogueSource>('fallback')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tone, setTone] = useState('all')

  useEffect(() => {
    let active = true

    loadProducts().then((result) => {
      if (!active) return
      setProducts(result.products)
      setSource(result.source)
      setNotice(result.notice ?? '')
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  const tones = useMemo(
    () => [...new Set(products.map((product) => product.tone))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesTone = tone === 'all' || product.tone === tone
      const searchable = [
        product.name,
        product.short,
        product.description,
        product.use,
        ...(product.colours ?? []),
      ].join(' ').toLowerCase()

      return matchesTone && (!term || searchable.includes(term))
    })
  }, [products, search, tone])

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
          The Panda Mabati collection
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl">
          Find the right roof for your project.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Explore roofing profiles for homes and commercial buildings.
          Confirm specifications, finishes, pricing and availability with
          our team before placing an order.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try Box Profile or residential..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="profile-filter"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Roofing profile
            </label>
            <select
              id="profile-filter"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
            >
              <option value="all">All profiles</option>
              {tones.map((item) => (
                <option key={item} value={item}>
                  {item.replace(/-/g, ' ').replace(/\b\w/g, (letter) =>
                    letter.toUpperCase(),
                  )}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600" aria-live="polite">
          {loading
            ? 'Loading roofing products…'
            : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
        </p>
      </div>

      {source === 'fallback' && notice && (
        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          {notice} These are catalogue reference profiles, not confirmation
          of current factory stock.
        </p>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const hasConfirmedPrice =
              product.priceStatus === 'confirmed' &&
              typeof product.unitPriceKes === 'number' &&
              Number.isFinite(product.unitPriceKes) &&
              product.unitPriceKes > 0

            return (
              <article
                key={product.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900">
                    {product.use}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {source === 'firestore' ? 'Published' : 'Reference'}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-emerald-950">
                  {product.name}
                </h2>
                <p className="mt-2 font-semibold text-slate-700">
                  {product.short}
                </p>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                {(product.colours?.length || product.gaugesMm?.length) ? (
                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                    {product.colours && (
                      <p>
                        <span className="font-semibold text-slate-800">Colours:</span>{' '}
                        {product.colours.join(', ')}
                      </p>
                    )}
                    {product.gaugesMm && (
                      <p>
                        <span className="font-semibold text-slate-800">Gauges (mm):</span>{' '}
                        {product.gaugesMm.join(', ')}
                      </p>
                    )}
                  </div>
                ) : null}

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {hasConfirmedPrice ? 'Confirmed listed price' : 'Pricing'}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-emerald-950">
                    {hasConfirmedPrice
                      ? formatKes(product.unitPriceKes!)
                      : 'Price on request'}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {hasConfirmedPrice
                      ? 'Confirm the applicable unit and current availability before ordering.'
                      : 'Get a quote for your required profile and specifications.'}
                  </p>
                </div>

                <Link
                  to={`/quote?product=${encodeURIComponent(product.id)}`}
                  className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
                >
                  Request a quote
                </Link>
              </article>
            )
          })}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <h2 className="text-lg font-bold text-slate-900">
            No matching products
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Try another search term or choose all profiles.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setTone('all')
            }}
            className="mt-4 font-semibold text-emerald-800 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-12 rounded-2xl bg-emerald-950 p-6 text-white sm:p-8">
        <h2 className="text-2xl font-bold">Need help choosing your roofing?</h2>
        <p className="mt-3 max-w-2xl leading-7 text-emerald-100">
          Share your project requirements with Panda Mabati to discuss suitable
          profiles, specifications and pricing.
        </p>
        <Link
          to="/quote"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-emerald-950 hover:bg-emerald-50"
        >
          Tell us about your project
        </Link>
      </div>
    </section>
  )
}
