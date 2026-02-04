import React from "react";
import { DinoMascot } from "./DinoMascot";

interface LoadingStateProps {
  message?: string;
}

const LOADING_MESSAGES = [
  "Rex is firing up the prehistoric stove...",
  "Consulting the ancient recipe scrolls...",
  "Gathering ingredients from the Jurassic garden...",
  "Calculating optimal nutrition for your goals...",
  "Adding a dash of dino magic...",
];

export function LoadingState({ message }: LoadingStateProps) {
  const randomMessage = message || LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <DinoMascot mood="cooking" size="xl" animate />
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground animate-pulse">
          {randomMessage}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
