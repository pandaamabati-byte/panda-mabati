import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('Panda Mabati storefront', () => {
  beforeEach(() => {
    window.location.hash = '';
  });
  it('renders the homepage and accessible primary navigation', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /good roofs begin with better choices/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('navigation', { name: /main navigation/i }),
    ).toBeInTheDocument()
  })

  it('renders all roofing profiles', () => {
    render(<App />)

    for (const profile of ['D-Tile', 'Versatile', 'Box Profile', 'StarTile']) {
      expect(
        screen.getAllByRole('heading', { name: profile }).length,
      ).toBeGreaterThan(0)
    }
  })


  it('searches products and filters the catalogue by category', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', { name: 'Accessories' })[0])
    expect(screen.getAllByRole('heading', { name: 'Rainwater Gutters' }).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Showing \d+ of \d+ products/)[0].textContent).not.toBe('Showing 14 of 14 products')

    fireEvent.click(screen.getAllByRole('button', { name: 'All products' })[0])
    fireEvent.change(screen.getAllByRole('searchbox', { name: /search roofing products/i })[0], { target: { value: 'corrugated' } })
    expect(screen.getAllByRole('button', { name: 'Corrugated Roofing' }).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Showing \d+ of \d+ products/)[0].textContent).not.toBe('Showing 14 of 14 products')
  })

  it('updates colour selections and the product visual preview across sheet products', () => {
    window.location.hash = '#product/d-tile';
    const dTile = render(<App />);
    fireEvent.change(screen.getByLabelText('Colour'), { target: { value: 'Dark Grey' } });
    expect(screen.getByRole('heading', { name: /Dark Grey/ })).toBeInTheDocument();
    expect(dTile.container.querySelector('.product-detail-colour-overlay')).not.toBeNull();
    dTile.unmount();

    window.location.hash = '#product/box-profile';
    const box = render(<App />);
    fireEvent.change(screen.getByLabelText('Colour'), { target: { value: 'Grey' } });
    expect(screen.getByRole('heading', { name: /Grey/ })).toBeInTheDocument();
    box.unmount();

    window.location.hash = '#product/versatile';
    render(<App />);
    fireEvent.change(screen.getAllByLabelText(/Colour preference/)[0], { target: { value: 'Tile Red' } });
    expect(screen.getAllByLabelText(/Colour preference/)[0]).toHaveValue('Tile Red');
    window.location.hash = '';
  });

  it('shows an honest profile visual for Versatile and updates the colour preference', () => {
    window.location.hash = '#product/versatile';
    const { container } = render(<App />);
    expect(container.querySelector('.product-detail-placeholder .product-profile-visual')).not.toBeNull();
    expect(container.querySelector('.product-detail-photo-stage img')).toBeNull();
    expect(screen.getAllByText(/PRODUCT PROFILE VISUAL · PHOTO PENDING/i).length).toBeGreaterThan(0);
    fireEvent.change(screen.getAllByLabelText(/Colour preference/)[0], { target: { value: 'Tile Red' } });
    expect(screen.getAllByLabelText(/Colour preference/)[0]).toHaveValue('Tile Red');
    window.location.hash = '';
  });

  it('shows clearly labelled profile visuals instead of unapproved photos for unverified product families', () => {
    const { container } = render(<App />);
    const ids = ['versatile', 'glazed-tile', 'elegantile', 'decra', 'ridge-caps', 'flashings', 'gutters', 'roll-tops', 'valley-trays', 'roofing-fasteners'];
    for (const id of ids) {
      const card = container.querySelector(`[data-product-id="${id}"]`);
      expect(card?.getAttribute('data-image-status')).toBe('profile-visual');
      expect(card?.querySelector('.product-profile-visual')).not.toBeNull();
      expect(card?.querySelector('img.product-card__photo')).toBeNull();
    }
    expect(screen.getAllByText(/PROFILE VISUAL · PHOTO PENDING/i).length).toBeGreaterThan(0);
  });

  it('shows real manufacturer photos where verified and profile visuals for the remaining catalogue cards', () => {
    const { container } = render(<App />);
    const dTile = container.querySelector('[data-product-id="d-tile"]');
    const versatile = container.querySelector('[data-product-id="versatile"]');
    expect(dTile?.getAttribute('data-image-status')).toBe('verified-photo')
    for (const id of ['eurotile', 'roman-tile']) {
      const card = container.querySelector(`[data-product-id="${id}"]`)
      expect(card?.getAttribute('data-image-status')).toBe('verified-photo')
      expect(card?.querySelector('img.product-card__photo')?.getAttribute('src')).toMatch(/^data:image\/webp;base64,/)
    };
    expect(versatile?.getAttribute('data-image-status')).toBe('profile-visual');
    expect(screen.getAllByText(/Genuine Panda photos: 6 of 16 product families/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PROFILE VISUAL · PHOTO PENDING/i).length).toBeGreaterThan(0);
  });

  it('keeps the approved Panda Mabati logo on selected product detail pages', () => {
    window.location.hash = '#product/d-tile';
    const { container } = render(<App />);
    const logo = container.querySelector('.product-detail-header .brand__logo');
    expect(logo).toHaveAttribute('alt', 'Panda Mabati — We Represent Quality');
    expect(logo?.getAttribute('src')).toContain('panda-mabati-logo');
    window.location.hash = '';
  });

  it('collects separate delivery point, site address and receiving contact details', () => {
    render(<App />);
    expect(screen.getAllByLabelText(/place of delivery/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/site \/ delivery address/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/landmark \/ directions/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/delivery contact person/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/delivery contact phone/i).length).toBeGreaterThan(0);
  });

  it('renders the quotation builder and PDF download action', () => {
    render(<App />)

    expect(
      screen.getAllByRole('heading', {
        name: /build your roofing quotation/i,
      }).length,
    ).toBeGreaterThan(0)

    expect(
      screen.getAllByRole('button', {
        name: /download quotation pdf/i,
      }).length,
    ).toBeGreaterThan(0)
  })
})
