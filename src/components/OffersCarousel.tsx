import type { Offer } from '../types';

interface OffersCarouselProps {
  offers: Offer[];
}

export function OffersCarousel({ offers }: OffersCarouselProps) {
  if (offers.length === 0) {
    return (
      <div className="card card-padding" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--accent)" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
          </svg>
          <h2 className="heading-lg" style={{ marginBottom: 'var(--spacing-sm)' }}>Keine Angebote verfügbar</h2>
          <p className="text-body">
            Aktuell sind keine Sonderangebote in deiner Region verfügbar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div>
        <h1 className="heading-xl">Aktuelle Angebote</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
          {offers.length} {offers.length === 1 ? 'Angebot' : 'Angebote'} in deiner Region
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-md)' }}>
        {offers.map((offer) => (
          <div key={offer.id} className="card" style={{ overflow: 'hidden' }}>
            <div
              style={{
                height: '160px',
                background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
              }}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.9 }}>
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
              </svg>
              {offer.discount && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    background: 'var(--accent)',
                    color: 'var(--text-primary)',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    borderRadius: '8px',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--font-size-sm)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  {offer.discount}
                </div>
              )}
            </div>

            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xs)' }}>
                <h3 className="heading-md" style={{ flex: 1, marginRight: 'var(--spacing-sm)' }}>
                  {offer.name}
                </h3>
              </div>
              
              {offer.store && (
                <p className="text-xs" style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
                    <path d="M20 4H4v2h16v12H4v2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5v-2h14v2zm-3-5H8v-2h8v2z"/>
                  </svg>
                  {offer.store}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                <span className="heading-lg" style={{ color: 'var(--primary)' }}>
                  {offer.price}
                </span>
                {offer.originalPrice && (
                  <span className="text-sm" style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                    {offer.originalPrice}
                  </span>
                )}
              </div>

              {offer.validUntil && (
                <p className="text-xs" style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-muted)' }}>
                  Gültig bis: {offer.validUntil}
                </p>
              )}
            </div>

            <div className="card-footer" style={{ borderTop: '1px solid var(--card-border)', padding: 'var(--spacing-md) var(--spacing-lg)' }}>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                Zum Angebot
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 'var(--spacing-xs)' }}>
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
