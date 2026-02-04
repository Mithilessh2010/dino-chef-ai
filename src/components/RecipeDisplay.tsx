import React from "react";
import { Recipe } from "@/types/recipe";
import { Clock, Users, Flame, ChefHat, Lightbulb, ArrowRightLeft, Sparkles } from "lucide-react";
import { DinoMascot } from "./DinoMascot";
import { Button } from "@/components/ui/button";

interface RecipeDisplayProps {
  recipe: Recipe;
  onSave?: () => void;
  onBack?: () => void;
  saving?: boolean;
  showActions?: boolean;
}

export function RecipeDisplay({ recipe, onSave, onBack, saving, showActions = true }: RecipeDisplayProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with dino commentary */}
      <div className="dino-card bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-start gap-4">
          <DinoMascot mood="excited" size="md" />
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {recipe.title}
            </h2>
            <p className="text-muted-foreground">{recipe.description}</p>
            {recipe.dinoCommentary && (
              <div className="mt-4 p-3 rounded-xl bg-dino-green-light/50 border border-dino-green/20">
                <p className="text-sm text-jungle-dark italic">
                  🦖 "{recipe.dinoCommentary}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="dino-card flex items-center gap-3 p-4">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Total Time</p>
            <p className="font-semibold">{recipe.totalTime || recipe.total_time || (recipe.prepTime || 0) + (recipe.cookTime || 0)} min</p>
          </div>
        </div>
        <div className="dino-card flex items-center gap-3 p-4">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Servings</p>
            <p className="font-semibold">{recipe.servings}</p>
          </div>
        </div>
        <div className="dino-card flex items-center gap-3 p-4">
          <Flame className="h-5 w-5 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="font-semibold">{recipe.nutrition?.calories || 0}</p>
          </div>
        </div>
        <div className="dino-card flex items-center gap-3 p-4">
          <ChefHat className="h-5 w-5 text-secondary" />
          <div>
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <p className="font-semibold capitalize">{recipe.difficulty}</p>
          </div>
        </div>
      </div>

      {/* Nutrition breakdown */}
      <div className="dino-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Nutrition per Serving
        </h3>
        <div className="grid grid-cols-5 gap-3">
          <div className="nutrition-badge">
            <span className="nutrition-badge-value">{recipe.nutrition?.calories || 0}</span>
            <span className="nutrition-badge-label">Cal</span>
          </div>
          <div className="nutrition-badge">
            <span className="nutrition-badge-value">{recipe.nutrition?.protein || 0}g</span>
            <span className="nutrition-badge-label">Protein</span>
          </div>
          <div className="nutrition-badge">
            <span className="nutrition-badge-value">{recipe.nutrition?.carbs || 0}g</span>
            <span className="nutrition-badge-label">Carbs</span>
          </div>
          <div className="nutrition-badge">
            <span className="nutrition-badge-value">{recipe.nutrition?.fat || 0}g</span>
            <span className="nutrition-badge-label">Fat</span>
          </div>
          <div className="nutrition-badge">
            <span className="nutrition-badge-value">{recipe.nutrition?.fiber || 0}g</span>
            <span className="nutrition-badge-label">Fiber</span>
          </div>
        </div>
        {recipe.nutrition?.goalNotes && (
          <p className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            💡 {recipe.nutrition.goalNotes}
          </p>
        )}
      </div>

      {/* Ingredients */}
      <div className="dino-card">
        <h3 className="text-lg font-bold mb-4">🥗 Ingredients</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="flex-1">
                <span className="font-medium">{ing.amount} {ing.unit}</span>{" "}
                <span>{ing.name}</span>
                {ing.notes && (
                  <span className="text-muted-foreground text-sm"> ({ing.notes})</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="dino-card">
        <h3 className="text-lg font-bold mb-4">👨‍🍳 Instructions</h3>
        <ol className="space-y-6">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {step.step}
              </span>
              <div className="flex-1 pt-1">
                <p className="text-foreground">{step.instruction}</p>
                {step.tip && (
                  <p className="mt-2 text-sm text-muted-foreground bg-muted p-2 rounded-lg flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5 text-accent" />
                    {step.tip}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      {recipe.tips && recipe.tips.length > 0 && (
        <div className="dino-card bg-gradient-to-br from-accent/5 to-secondary/5">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Rex's Tips
          </h3>
          <ul className="space-y-2">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-accent">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Substitutions */}
      {recipe.substitutions && recipe.substitutions.length > 0 && (
        <div className="dino-card">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Substitutions
          </h3>
          <div className="space-y-3">
            {recipe.substitutions.map((sub, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <span className="font-medium">{sub.original}</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-medium text-primary">{sub.substitute}</span>
                {sub.notes && (
                  <span className="text-sm text-muted-foreground">({sub.notes})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-4 pt-4">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex-1">
              New Recipe
            </Button>
          )}
          {onSave && (
            <Button onClick={onSave} disabled={saving} className="flex-1">
              {saving ? "Saving..." : "Save to My Recipes 🦖"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
