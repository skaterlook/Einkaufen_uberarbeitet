import { useState } from 'react';
import type { UserProfile } from '../types';

interface GenerateModalProps {
  userProfile: UserProfile | null;
  onGenerate: (preferences: any) => void;
  onClose: () => void;
}

export function GenerateModal({ userProfile, onGenerate, onClose }: GenerateModalProps) {
  const [numDays, setNumDays] = useState(7);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [targetCalories, setTargetCalories] = useState(2000);
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([]);
  const [excludeIngredients, setExcludeIngredients] = useState('');

  const cuisineOptions = ['deutsch', 'italienisch', 'asiatisch', 'mexikanisch', 'mediterran', 'indisch', 'amerikanisch'];

  const toggleCuisine = (cuisine: string) => {
    if (cuisinePreferences.includes(cuisine)) {
      setCuisinePreferences(cuisinePreferences.filter((c) => c !== cuisine));
    } else {
      setCuisinePreferences([...cuisinePreferences, cuisine]);
    }
  };

  const handleGenerate = () => {
    onGenerate({
      numDays,
      mealsPerDay,
      targetCalories,
      cuisinePreferences,
      excludeIngredients: excludeIngredients.split(',').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Neuen Essensplan erstellen</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)' }}>Grundlegende Einstellungen</h3>
            
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <div>
                <label className="input-label">Anzahl Tage</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setNumDays(Math.max(1, numDays - 1))}
                  >
                    −
                  </button>
                  <span className="heading-md" style={{ minWidth: '40px', textAlign: 'center' }}>{numDays}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setNumDays(Math.min(14, numDays + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="input-label">Mahlzeiten pro Tag</label>
                <select
                  className="input"
                  value={mealsPerDay}
                  onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
                >
                  <option value={2}>2 (Frühstück, Abendessen)</option>
                  <option value={3}>3 (Frühstück, Mittag, Abend)</option>
                  <option value={4}>4 (inkl. Snack)</option>
                  <option value={5}>5 (inkl. 2 Snacks)</option>
                </select>
              </div>

              <div>
                <label className="input-label">Ziel-Kalorien pro Tag</label>
                <input
                  type="number"
                  className="input"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(parseInt(e.target.value))}
                  placeholder="z.B. 2000"
                />
                <p className="text-xs" style={{ marginTop: 'var(--spacing-xs)', color: 'var(--text-muted)' }}>
                  Basierend auf deinem Profil: {userProfile ? 'berechnet' : 'nicht eingestellt'}
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)' }}>Küchenpräferenzen</h3>
            <p className="text-sm" style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>
              Wähle deine bevorzugten Küchenstile aus
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
              {cuisineOptions.map((cuisine) => (
                <label
                  key={cuisine}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: cuisinePreferences.includes(cuisine) ? 'rgba(232, 93, 63, 0.08)' : 'var(--bg-secondary)',
                    border: cuisinePreferences.includes(cuisine) ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={cuisinePreferences.includes(cuisine)}
                    onChange={() => toggleCuisine(cuisine)}
                    style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                  />
                  <span className="text-sm" style={{ textTransform: 'capitalize' }}>{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)' }}>Zutaten ausschließen</h3>
            <textarea
              className="input"
              value={excludeIngredients}
              onChange={(e) => setExcludeIngredients(e.target.value)}
              placeholder="z.B. Pilze, Fisch, Nüsse (kommagetrennt)"
              rows={3}
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />
            <p className="text-xs" style={{ marginTop: 'var(--spacing-xs)', color: 'var(--text-muted)' }}>
              Diese Zutaten werden in keinem Gericht verwendet
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Abbrechen</button>
          <button className="btn btn-primary" onClick={handleGenerate}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 'var(--spacing-xs)' }}>
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Plan generieren
          </button>
        </div>
      </div>
    </div>
  );
}
