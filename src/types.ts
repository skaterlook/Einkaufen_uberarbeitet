export interface UserProfile {
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryPreferences?: string[];
}

export interface Meal {
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  ingredients: string[];
}

export interface MealPlan {
  id: string;
  meals: {
    [day: string]: Meal[];
  };
}

export interface ShoppingItem {
  id: number;
  name: string;
  checked: boolean;
}

export interface Offer {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  store?: string;
  validUntil?: string;
}

export interface SavedPlan {
  id: string;
  name: string;
  date: string;
  plan: MealPlan;
}
