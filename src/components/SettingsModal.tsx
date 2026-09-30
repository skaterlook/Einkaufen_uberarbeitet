import { useState } from 'react';
import type { UserProfile } from '../types';

interface SettingsModalProps {
  userProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export function SettingsModal({ userProfile, onSave, onClose }: SettingsModalProps) {
  const [name, setName] = useState(userProfile?.name || '');
  const [age, setAge] = useState(userProfile?.age?.toString() || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(userProfile?.gender || 'other');
  const [weight, setWeight] = useState(userProfile?.weight?.toString() || '');
  const [height, setHeight] = useState(userProfile?.height?.toString() || '');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>(userProfile?.activityLevel || 'moderate');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(userProfile?.dietaryPreferences || []);

  const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'low-carb', 'high-protein'];

  const toggleDietary = (pref: string) => {
    if (dietaryPreferences.includes(pref)) {
      setDietaryPreferences(dietaryPreferences.filter((p) => p !== pref));
    } else {
      setDietaryPreferences([...dietaryPreferences, pref]);
    }
  };

  const handleSave = () => {
    const profile: UserProfile = {
      name,
      age: age ? parseInt(age) : undefined,
      gender,
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? parseFloat(height) : undefined,
      activityLevel,
      dietaryPreferences,
    };
    onSave(profile);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Einstellungen</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)' }}>Persönliche Daten</h3>
            
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <div>
                <label className="input-label">Name</label>
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dein Name"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label className="input-label">Alter</label>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="z.B. 30"
                  />
                </div>
                <div>
                  <label className="input-label">Geschlecht</label>
                  <select
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                  >
                    <option value="male">Männlich</option>
                    <option value="female">Weiblich</option>
                    <option value="other">Andere</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label className="input-label">Gewicht (kg)</label>
                  <input
                    type="number"
                    className="input"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="z.B. 75"
                  />
                </div>
                <div>
                  <label className="input-label">Größe (cm)</label>
                  <input
                    type="number"
                    className="input"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="z.B. 180"
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)' }}>Aktivitätslevel</h3>
            <select
              className="input"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active')}
            >
              <option value="sedentary">Wenig aktiv (Bürojob)</option>
              <option value="light">Leicht aktiv (1-3x Sport)</option>
              <option value="moderate">Mäßig aktiv (3-5x Sport)</option>
              <option value="active">Sehr aktiv (6-7x Sport)</option>
              <option value="very_active">Extrem aktiv (körperliche Arbeit)</option>
            </select>
          </div>

          <div>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)' }}>Ernährungspräferenzen</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
              {dietaryOptions.map((option) => (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: dietaryPreferences.includes(option) ? 'rgba(232, 93, 63, 0.08)' : 'var(--bg-secondary)',
                    border: dietaryPreferences.includes(option) ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={dietaryPreferences.includes(option)}
                    onChange={() => toggleDietary(option)}
                    style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                  />
                  <span className="text-sm" style={{ textTransform: 'capitalize' }}>
                    {option.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Abbrechen</button>
          <button className="btn btn-primary" onClick={handleSave}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 'var(--spacing-xs)' }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
