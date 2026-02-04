export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
}

export interface Instruction {
  step: number;
  instruction: string;
  tip?: string;
}

export interface Substitution {
  original: string;
  substitute: string;
  notes?: string;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  goalNotes?: string;
}

export interface Recipe {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  dinoCommentary?: string;
  dino_commentary?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tips: string[];
  substitutions: Substitution[];
  prepTime?: number;
  prep_time?: number;
  cookTime?: number;
  cook_time?: number;
  totalTime?: number;
  total_time?: number;
  servings: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  food_goal?: string;
  nutrition: Nutrition;
  created_at?: string;
  updated_at?: string;
}

export type FoodGoal = 
  | "muscle-building"
  | "high-protein"
  | "low-calorie"
  | "balanced"
  | "cutting"
  | "bulking"
  | "general-health";

export const FOOD_GOALS: { value: FoodGoal; label: string; description: string; emoji: string }[] = [
  { value: "muscle-building", label: "Muscle Building", description: "High protein for gains", emoji: "💪" },
  { value: "high-protein", label: "High Protein", description: "Maximize protein intake", emoji: "🥩" },
  { value: "low-calorie", label: "Low Calorie", description: "Lighter meals", emoji: "🥗" },
  { value: "balanced", label: "Balanced Diet", description: "Well-rounded nutrition", emoji: "⚖️" },
  { value: "cutting", label: "Cutting", description: "Lean muscle preservation", emoji: "🔥" },
  { value: "bulking", label: "Bulking", description: "Calorie surplus for growth", emoji: "🦖" },
  { value: "general-health", label: "General Health", description: "Overall wellness", emoji: "🌿" },
];
