import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../components/layout/RootLayout'
import { CalculatorPage } from '../pages/CalculatorPage'
import { ContactPage } from '../pages/ContactPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductsPage } from '../pages/ProductsPage'
import { QuotePage } from '../pages/QuotePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'calculator', element: <CalculatorPage /> },
      { path: 'quote', element: <QuotePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
