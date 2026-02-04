import React from "react";
import { Recipe } from "@/types/recipe";
import { Clock, Flame, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  onDelete?: () => void;
}

export function RecipeCard({ recipe, onClick, onDelete }: RecipeCardProps) {
  const goalEmoji = {
    "muscle-building": "💪",
    "high-protein": "🥩",
    "low-calorie": "🥗",
    "balanced": "⚖️",
    "cutting": "🔥",
    "bulking": "🦖",
    "general-health": "🌿",
  };

  const totalTime = recipe.totalTime || recipe.total_time || (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div 
      className="dino-card cursor-pointer group relative"
      onClick={onClick}
    >
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">
          {goalEmoji[recipe.food_goal as keyof typeof goalEmoji] || "🍽️"}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {totalTime} min
        </span>
        <span className="flex items-center gap-1">
          <Flame className="h-4 w-4 text-accent" />
          {recipe.nutrition?.calories || 0} cal
        </span>
        <span className="font-medium text-primary">
          {recipe.nutrition?.protein || 0}g protein
        </span>
      </div>

      {recipe.created_at && (
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
          Added {formatDistanceToNow(new Date(recipe.created_at), { addSuffix: true })}
        </p>
      )}
    </div>
  );
}
