import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRecipes } from "@/hooks/useRecipes";
import { Recipe, FoodGoal } from "@/types/recipe";
import { DinoMascot } from "@/components/DinoMascot";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, ChefHat, Flame, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { recipes, loading, fetchRecipes, deleteRecipe } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user, fetchRecipes]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const stats = {
    totalRecipes: recipes.length,
    totalCalories: recipes.reduce((sum, r) => sum + (r.nutrition?.calories || 0), 0),
    totalProtein: recipes.reduce((sum, r) => sum + (r.nutrition?.protein || 0), 0),
  };

  const getEncouragement = () => {
    if (recipes.length === 0) {
      return "Your kitchen adventure begins! Create your first recipe! 🦕";
    }
    if (recipes.length < 5) {
      return "Great start! Keep building your recipe collection! 🌿";
    }
    if (recipes.length < 10) {
      return "You're on fire! Rex is proud of your progress! 🔥";
    }
    return "Master chef status unlocked! You're a cooking legend! 👑";
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
          <div className="flex items-center gap-3">
            <DinoMascot mood="happy" size="sm" animate={false} />
            <span className="font-bold text-xl dino-gradient-text">DinoChef</span>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/create")} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Recipe</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome section */}
        <section className="dino-card bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="flex items-center gap-4">
            <DinoMascot mood="excited" size="lg" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Hey there, Chef! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {getEncouragement()}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4">
          <div className="dino-card flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <ChefHat className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalRecipes}</p>
              <p className="text-xs text-muted-foreground">Recipes</p>
            </div>
          </div>
          <div className="dino-card flex items-center gap-3">
            <div className="p-3 rounded-full bg-accent/10">
              <Flame className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalCalories.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Cal</p>
            </div>
          </div>
          <div className="dino-card flex items-center gap-3">
            <div className="p-3 rounded-full bg-secondary/10">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalProtein}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section>
          <h2 className="text-xl font-bold mb-4">Your Recipes</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="dino-card animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="dino-card text-center py-12">
              <DinoMascot mood="thinking" size="lg" className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recipes yet!</h3>
              <p className="text-muted-foreground mb-4">
                Let Rex help you create your first delicious meal
              </p>
              <Button onClick={() => navigate("/create")}>
                Create Your First Recipe 🦖
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onDelete={() => recipe.id && deleteRecipe(recipe.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Recipe detail modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">{selectedRecipe?.title}</DialogTitle>
          </DialogHeader>
          {selectedRecipe && (
            <RecipeDisplay recipe={selectedRecipe} showActions={false} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
