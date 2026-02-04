import React from "react";
import { FOOD_GOALS, FoodGoal } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface GoalSelectorProps {
  value: FoodGoal;
  onChange: (goal: FoodGoal) => void;
  disabled?: boolean;
}

export function GoalSelector({ value, onChange, disabled }: GoalSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {FOOD_GOALS.map((goal) => (
        <button
          key={goal.value}
          onClick={() => onChange(goal.value)}
          disabled={disabled}
          className={cn(
            "goal-card text-left",
            value === goal.value && "selected"
          )}
        >
          <span className="text-2xl mb-2 block">{goal.emoji}</span>
          <span className="font-semibold text-sm block text-foreground">
            {goal.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {goal.description}
          </span>
        </button>
      ))}
    </div>
  );
}
