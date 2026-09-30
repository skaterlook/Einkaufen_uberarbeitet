import { useState, useEffect } from 'react';
import { MealPlanView } from './components/MealPlanView';
import { ShoppingListView } from './components/ShoppingListView';
import { OffersCarousel } from './components/OffersCarousel';
import { SavedVaultView } from './components/SavedVaultView';
import { SettingsModal } from './components/SettingsModal';
import { GenerateModal } from './components/GenerateModal';
import type { MealPlan, ShoppingItem, Offer, SavedPlan, UserProfile } from './types';
import { mealPlansData, shoppingListData, offersData, savedPlansData } from './data/data';

type View = 'mealplan' | 'shopping' | 'offers' | 'saved';

function App() {
  const [currentView, setCurrentView] = useState<View>('mealplan');
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(mealPlansData);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(shoppingListData);
  const [offers, setOffers] = useState<Offer[]>(offersData);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(savedPlansData);
  const [showSettings, setShowSettings] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }, []);

  const handleSavePlan = (plan: MealPlan) => {
    const newPlan: SavedPlan = {
      id: Date.now().toString(),
      name: `Plan ${savedPlans.length + 1}`,
      date: new Date().toISOString(),
      plan,
    };
    setSavedPlans([newPlan, ...savedPlans]);
  };

  const handleGeneratePlan = async (preferences: any) => {
    setIsGenerating(true);
    setShowGenerate(false);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numPlans: 1,
          userProfile,
          preferences,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate');

      const data = await response.json();
      const newPlans: MealPlan[] = data.plans;
      setMealPlans([...mealPlans, ...newPlans]);
      setCurrentView('mealplan');
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Fehler beim Generieren. Bitte versuche es erneut.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePlan = (planId: string) => {
    setMealPlans(mealPlans.filter((p) => p.id !== planId));
  };

  const handleAddToShoppingList = (items: ShoppingItem[]) => {
    const existingItems = new Map(shoppingItems.map((item) => [item.name, item]));
    items.forEach((item) => {
      if (existingItems.has(item.name)) {
        const existing = existingItems.get(item.name)!;
        existing.checked = false;
      } else {
        shoppingItems.push({ ...item, checked: false });
      }
    });
    setShoppingItems([...shoppingItems]);
    setCurrentView('shopping');
  };

  const handleToggleItem = (itemId: number) => {
    setShoppingItems(
      shoppingItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClearChecked = () => {
    setShoppingItems(shoppingItems.filter((item) => !item.checked));
  };

  const navItems = [
    { id: 'mealplan' as View, label: 'Essensplan', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
      </svg>
    )},
    { id: 'shopping' as View, label: 'Einkauf', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    )},
    { id: 'offers' as View, label: 'Angebote', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
      </svg>
    )},
    { id: 'saved' as View, label: 'Gespeichert', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
      </svg>
    )},
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="top-nav">
        <div className="top-nav-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <span>Einkaufen</span>
        </div>
        <div className="top-nav-menu">
          <button className="btn btn-ghost btn-icon" onClick={() => setShowGenerate(true)} title="Neuen Plan erstellen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="btn btn-ghost btn-icon" onClick={() => setShowSettings(true)} title="Einstellungen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--spacing-lg)' }}>
        {currentView === 'mealplan' && (
          <MealPlanView
            mealPlans={mealPlans}
            onGenerate={() => setShowGenerate(true)}
            onSavePlan={handleSavePlan}
            onDeletePlan={handleDeletePlan}
            onAddToShoppingList={handleAddToShoppingList}
            isGenerating={isGenerating}
          />
        )}

        {currentView === 'shopping' && (
          <ShoppingListView
            items={shoppingItems}
            onToggleItem={handleToggleItem}
            onClearChecked={handleClearChecked}
          />
        )}

        {currentView === 'offers' && (
          <OffersCarousel offers={offers} />
        )}

        {currentView === 'saved' && (
          <SavedVaultView
            savedPlans={savedPlans}
            onLoadPlan={(plan) => {
              setMealPlans([...mealPlans, plan]);
              setCurrentView('mealplan');
            }}
            onDeletePlan={(id) => {
              setSavedPlans(savedPlans.filter((p) => p.id !== id));
            }}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`bottom-nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView(item.id);
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Modals */}
      {showSettings && (
        <SettingsModal
          userProfile={userProfile}
          onSave={(profile) => {
            setUserProfile(profile);
            localStorage.setItem('userProfile', JSON.stringify(profile));
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showGenerate && (
        <GenerateModal
          userProfile={userProfile}
          onGenerate={handleGeneratePlan}
          onClose={() => setShowGenerate(false)}
        />
      )}
    </div>
  );
}

export default App;
