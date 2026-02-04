import React, { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
  disabled?: boolean;
}

const SUGGESTED_INGREDIENTS = [
  "Chicken breast", "Eggs", "Rice", "Broccoli", "Salmon",
  "Sweet potato", "Spinach", "Oats", "Greek yogurt", "Avocado",
  "Quinoa", "Lentils", "Tofu", "Almonds", "Banana"
];

export function IngredientInput({ ingredients, onChange, disabled }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (trimmed && !ingredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...ingredients, trimmed]);
    }
    setInputValue("");
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  const availableSuggestions = SUGGESTED_INGREDIENTS.filter(
    s => !ingredients.some(i => i.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type an ingredient and press Enter..."
          disabled={disabled}
          className="flex-1 bg-card border-input"
        />
        <Button
          type="button"
          onClick={() => addIngredient(inputValue)}
          disabled={!inputValue.trim() || disabled}
          variant="secondary"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected ingredients */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="ingredient-chip group"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(index)}
                disabled={disabled}
                className="ml-1 hover:text-destructive transition-colors"
                aria-label={`Remove ${ingredient}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick add suggestions */}
      {availableSuggestions.length > 0 && ingredients.length < 10 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 8).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addIngredient(suggestion)}
                disabled={disabled}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
