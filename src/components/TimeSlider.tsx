import React from "react";
import { Slider } from "@/components/ui/slider";

interface TimeSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const TIME_PRESETS = [
  { value: 15, label: "Quick", emoji: "⚡" },
  { value: 30, label: "Easy", emoji: "🍳" },
  { value: 45, label: "Moderate", emoji: "👨‍🍳" },
  { value: 60, label: "Leisurely", emoji: "🦖" },
  { value: 90, label: "Weekend", emoji: "🎉" },
];

export function TimeSlider({ value, onChange, disabled }: TimeSliderProps) {
  const getTimeLabel = (minutes: number) => {
    if (minutes < 20) return { label: "Quick bite!", emoji: "⚡" };
    if (minutes < 35) return { label: "Easy meal", emoji: "🍳" };
    if (minutes < 50) return { label: "Taking your time", emoji: "👨‍🍳" };
    if (minutes < 70) return { label: "Leisurely cooking", emoji: "🦖" };
    return { label: "Weekend feast!", emoji: "🎉" };
  };

  const timeInfo = getTimeLabel(value);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-primary">
          {value} <span className="text-lg font-medium text-muted-foreground">min</span>
        </span>
        <span className="text-sm text-muted-foreground">
          {timeInfo.emoji} {timeInfo.label}
        </span>
      </div>

      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={10}
        max={120}
        step={5}
        disabled={disabled}
        className="py-4"
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>10 min</span>
        <span>2 hours</span>
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2 pt-2">
        {TIME_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              value === preset.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {preset.emoji} {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
