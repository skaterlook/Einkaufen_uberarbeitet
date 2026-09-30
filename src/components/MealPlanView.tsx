import { useState } from 'react';
import type { MealPlan, ShoppingItem } from '../types';

interface MealPlanViewProps {
  mealPlans: MealPlan[];
  onGenerate: () => void;
  onSavePlan: (plan: MealPlan) => void;
  onDeletePlan: (planId: string) => void;
  onAddToShoppingList: (items: ShoppingItem[]) => void;
  isGenerating: boolean;
}

export function MealPlanView({
  mealPlans,
  onGenerate,
  onSavePlan,
  onDeletePlan,
  onAddToShoppingList,
  isGenerating,
}: MealPlanViewProps) {
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const toggleExpand = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const handleAddToShopping = (plan: MealPlan) => {
    const items: ShoppingItem[] = [];
    let id = 1;
    
    Object.values(plan.meals).flat().forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        items.push({
          id: id++,
          name: ingredient,
          checked: false,
        });
      });
    });
    
    onAddToShoppingList(items);
  };

  if (mealPlans.length === 0) {
    return (
      <div className="card card-padding" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--primary)" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
          </svg>
          <h2 className="heading-lg" style={{ marginBottom: 'var(--spacing-sm)' }}>Noch keine Essenspläne</h2>
          <p className="text-body" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Erstelle deinen ersten personalisierten Essensplan mit KI-Unterstützung.
          </p>
          <button className="btn btn-primary btn-lg" onClick={onGenerate}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Plan erstellen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="heading-xl">Deine Essenspläne</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
            {mealPlans.length} {mealPlans.length === 1 ? 'Plan' : 'Pläne'} verfügbar
          </p>
        </div>
        <button className="btn btn-primary" onClick={onGenerate} disabled={isGenerating}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          {isGenerating ? 'Erstelle...' : 'Neuer Plan'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
        {mealPlans.map((plan) => (
          <div key={plan.id} className="card">
            <div
              className="card-header"
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={() => toggleExpand(plan.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="heading-md">Plan #{plan.id.slice(-4)}</h3>
                  <p className="text-xs">
                    {Object.keys(plan.meals).length} Tage • {Object.values(plan.meals).flat().length} Mahlzeiten
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToShopping(plan);
                  }}
                  title="Zur Einkaufsliste hinzufügen"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSavePlan(plan);
                  }}
                  title="Speichern"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                  </svg>
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePlan(plan.id);
                  }}
                  title="Löschen"
                  style={{ color: 'var(--error)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="var(--text-muted)"
                  style={{
                    transform: expandedPlanId === plan.id ? 'rotate(180deg)' : 'none',
                    transition: 'transform 200ms ease',
                  }}
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </div>
            </div>

            {expandedPlanId === plan.id && (
              <div className="card-body" style={{ paddingTop: 0 }}>
                {Object.entries(plan.meals).map(([day, meals]) => (
                  <div key={day} style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h4 className="heading-sm" style={{ marginBottom: 'var(--spacing-md)', color: 'var(--primary)' }}>
                      {day}
                    </h4>
                    <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                      {meals.map((meal, index) => (
                        <div
                          key={index}
                          style={{
                            padding: 'var(--spacing-md)',
                            background: 'var(--bg-secondary)',
                            borderRadius: '12px',
                            border: '1px solid var(--card-border)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                            <span className="heading-sm">{meal.name}</span>
                            <span className="badge badge-primary">{meal.type}</span>
                          </div>
                          <p className="text-sm" style={{ marginBottom: 'var(--spacing-xs)' }}>
                            <strong>Kalorien:</strong> {meal.calories} kcal
                          </p>
                          <p className="text-sm">
                            <strong>Zutaten:</strong> {meal.ingredients.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
