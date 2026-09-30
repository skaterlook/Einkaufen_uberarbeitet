import type { ShoppingItem } from '../types';

interface ShoppingListViewProps {
  items: ShoppingItem[];
  onToggleItem: (itemId: number) => void;
  onClearChecked: () => void;
}

export function ShoppingListView({ items, onToggleItem, onClearChecked }: ShoppingListViewProps) {
  const checkedCount = items.filter((item) => item.checked).length;
  const uncheckedItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="heading-xl">Einkaufsliste</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            {uncheckedItems.length} offen • {checkedCount} erledigt
          </p>
        </div>
        {checkedCount > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={onClearChecked}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            Erledigte löschen
          </button>
        )}
      </div>

      {uncheckedItems.length > 0 && (
        <div className="card card-padding">
          <h2 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-primary)' }}>
            Noch zu erledigen
          </h2>
          <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
            {uncheckedItems.map((item) => (
              <label
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onToggleItem(item.id)}
                  style={{
                    width: '22px',
                    height: '22px',
                    accentColor: 'var(--primary)',
                    cursor: 'pointer',
                  }}
                />
                <span className="text-body" style={{ flex: 1 }}>{item.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {checkedItems.length > 0 && (
        <div className="card card-padding">
          <h2 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)', color: 'var(--success)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 'var(--spacing-xs)' }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Erledigt ({checkedCount})
          </h2>
          <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
            {checkedItems.map((item) => (
              <label
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: 'rgba(16, 185, 129, 0.04)',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                }}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => onToggleItem(item.id)}
                  style={{
                    width: '22px',
                    height: '22px',
                    accentColor: 'var(--success)',
                    cursor: 'pointer',
                  }}
                />
                <span className="text-body" style={{ textDecoration: 'line-through', color: 'var(--text-muted)', flex: 1 }}>
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="card card-padding" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--primary)" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <h2 className="heading-lg" style={{ marginBottom: 'var(--spacing-sm)' }}>Einkaufsliste ist leer</h2>
            <p className="text-body">
              Füge Artikel aus deinen Essensplänen hinzu oder erstelle einen neuen Plan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
