import type { SavedPlan } from '../types';

interface SavedVaultViewProps {
  savedPlans: SavedPlan[];
  onLoadPlan: (plan: any) => void;
  onDeletePlan: (id: string) => void;
}

export function SavedVaultView({ savedPlans, onLoadPlan, onDeletePlan }: SavedVaultViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (savedPlans.length === 0) {
    return (
      <div className="card card-padding" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--primary)" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
          </svg>
          <h2 className="heading-lg" style={{ marginBottom: 'var(--spacing-sm)' }}>Noch keine gespeicherten Pläne</h2>
          <p className="text-body">
            Speichere deine favorisierten Essenspläne, um sie später schnell wiederzuverwenden.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div>
        <h1 className="heading-xl">Gespeicherte Pläne</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
          {savedPlans.length} {savedPlans.length === 1 ? 'Plan' : 'Pläne'} gespeichert
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
        {savedPlans.map((saved) => (
          <div key={saved.id} className="card" style={{ overflow: 'hidden' }}>
            <div
              style={{
                height: '120px',
                background: 'linear-gradient(135deg, var(--secondary-light) 0%, var(--secondary) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
              }}
            >
              <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.9 }}>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: 'var(--spacing-md)',
                  right: 'var(--spacing-md)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  borderRadius: '8px',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-xs)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                </svg>
                Gespeichert
              </div>
            </div>

            <div className="card-body">
              <h3 className="heading-md" style={{ marginBottom: 'var(--spacing-xs)' }}>
                {saved.name}
              </h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                {formatDate(saved.date)}
              </p>

              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {Object.keys(saved.plan.meals).length} Tage • {Object.values(saved.plan.meals).flat().length} Mahlzeiten
              </div>
            </div>

            <div className="card-footer" style={{ display: 'flex', gap: 'var(--spacing-sm)', borderTop: '1px solid var(--card-border)' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => onLoadPlan(saved.plan)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 'var(--spacing-xs)' }}>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
                </svg>
                Laden
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onDeletePlan(saved.id)}
                title="Löschen"
                style={{ color: 'var(--error)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
