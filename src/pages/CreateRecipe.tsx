import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRecipes } from "@/hooks/useRecipes";
import { Recipe, FoodGoal } from "@/types/recipe";
import { DinoMascot } from "@/components/DinoMascot";
import { IngredientInput } from "@/components/IngredientInput";
import { GoalSelector } from "@/components/GoalSelector";
import { TimeSlider } from "@/components/TimeSlider";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function CreateRecipe() {
  const { user, loading: authLoading } = useAuth();
  const { generateRecipe, saveRecipe, generating } = useRecipes();
  const navigate = useNavigate();

  const [step, setStep] = useState<"input" | "result">("input");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [foodGoal, setFoodGoal] = useState<FoodGoal>("balanced");
  const [cookingTime, setCookingTime] = useState(30);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast.error("Add at least one ingredient!");
      return;
    }

    const recipe = await generateRecipe(ingredients, foodGoal, cookingTime);
    if (recipe) {
      recipe.food_goal = foodGoal;
      setGeneratedRecipe(recipe);
      setStep("result");
    }
  };

  const handleSave = async () => {
    if (!generatedRecipe) return;
    setSaving(true);
    const success = await saveRecipe(generatedRecipe);
    setSaving(false);
    if (success) {
      navigate("/dashboard");
    }
  };

  const handleReset = () => {
    setStep("input");
    setGeneratedRecipe(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DinoMascot mood="thinking" size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <DinoMascot mood="cooking" size="sm" animate={false} />
            <span className="font-bold dino-gradient-text">Create Recipe</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {generating ? (
          <LoadingState />
        ) : step === "input" ? (
          <div className="space-y-8 animate-fade-in">
            {/* Introduction */}
            <div className="text-center">
              <DinoMascot mood="excited" size="lg" className="mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                What's in your fridge? 🥗
              </h1>
              <p className="text-muted-foreground">
                Tell Rex what you have, and he'll cook up something amazing!
              </p>
            </div>

            {/* Ingredients */}
            <div className="dino-card">
              <h2 className="text-lg font-bold mb-4">🥕 Your Ingredients</h2>
              <IngredientInput
                ingredients={ingredients}
                onChange={setIngredients}
                disabled={generating}
              />
            </div>

            {/* Food goal */}
            <div className="dino-card">
              <h2 className="text-lg font-bold mb-4">🎯 Your Food Goal</h2>
              <GoalSelector
                value={foodGoal}
                onChange={setFoodGoal}
                disabled={generating}
              />
            </div>

            {/* Cooking time */}
            <div className="dino-card">
              <h2 className="text-lg font-bold mb-4">⏱️ Cooking Time</h2>
              <TimeSlider
                value={cookingTime}
                onChange={setCookingTime}
                disabled={generating}
              />
            </div>

            {/* Generate button */}
            <Button
              onClick={handleGenerate}
              disabled={ingredients.length === 0 || generating}
              className="w-full py-6 text-lg dino-glow"
              size="lg"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Generate My Recipe! 🦖
            </Button>
          </div>
        ) : (
          generatedRecipe && (
            <RecipeDisplay
              recipe={generatedRecipe}
              onSave={handleSave}
              onBack={handleReset}
              saving={saving}
            />
          )
        )}
      </main>
    </div>
  );
}
