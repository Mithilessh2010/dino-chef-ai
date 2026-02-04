import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Recipe, FoodGoal } from "@/types/recipe";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const fetchRecipes = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform database format to frontend format
      const transformed = (data || []).map((r) => ({
        ...r,
        dinoCommentary: r.dino_commentary,
        prepTime: r.prep_time,
        cookTime: r.cook_time,
        totalTime: r.total_time,
        ingredients: r.ingredients as unknown as Recipe["ingredients"],
        instructions: r.instructions as unknown as Recipe["instructions"],
        substitutions: r.substitutions as unknown as Recipe["substitutions"],
        nutrition: r.nutrition as unknown as Recipe["nutrition"],
        tips: r.tips || [],
      })) as Recipe[];
      
      setRecipes(transformed);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to load your recipes");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const generateRecipe = async (
    ingredients: string[],
    foodGoal: FoodGoal,
    cookingTime: number
  ): Promise<Recipe | null> => {
    setGenerating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ ingredients, foodGoal, cookingTime }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          toast.error("Whoa there, speedy! 🦕 Too many requests. Take a breath and try again.");
        } else if (response.status === 402) {
          toast.error("Rex needs more fuel! AI credits are low.");
        } else {
          toast.error(errorData.error || "Failed to generate recipe");
        }
        return null;
      }

      const recipe = await response.json();
      return recipe;
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Rex had trouble cooking up that recipe. Try again!");
      return null;
    } finally {
      setGenerating(false);
    }
  };

  const saveRecipe = async (recipe: Recipe): Promise<boolean> => {
    if (!user) {
      toast.error("Please sign in to save recipes");
      return false;
    }

    try {
      const recipeData = {
        user_id: user.id,
        title: recipe.title,
        description: recipe.description,
        dino_commentary: recipe.dinoCommentary,
        ingredients: JSON.parse(JSON.stringify(recipe.ingredients)),
        instructions: JSON.parse(JSON.stringify(recipe.instructions)),
        tips: recipe.tips,
        substitutions: JSON.parse(JSON.stringify(recipe.substitutions)),
        prep_time: recipe.prepTime,
        cook_time: recipe.cookTime,
        total_time: recipe.totalTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        food_goal: recipe.food_goal,
        nutrition: JSON.parse(JSON.stringify(recipe.nutrition)),
      };

      const { error } = await supabase.from("recipes").insert(recipeData);

      if (error) throw error;

      toast.success("Recipe saved to your collection! 🦖");
      await fetchRecipes();
      return true;
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error("Couldn't save that recipe. Try again!");
      return false;
    }
  };

  const deleteRecipe = async (recipeId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipeId);

      if (error) throw error;

      toast.success("Recipe removed from your collection");
      await fetchRecipes();
      return true;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Couldn't delete that recipe");
      return false;
    }
  };

  return {
    recipes,
    loading,
    generating,
    fetchRecipes,
    generateRecipe,
    saveRecipe,
    deleteRecipe,
  };
}
