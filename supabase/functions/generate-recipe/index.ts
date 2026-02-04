import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RecipeRequest {
  ingredients: string[];
  foodGoal: string;
  cookingTime: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, foodGoal, cookingTime } = await req.json() as RecipeRequest;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const goalDescriptions: Record<string, string> = {
      "muscle-building": "high protein, moderate carbs for muscle growth and recovery",
      "high-protein": "maximizing protein content while keeping calories reasonable",
      "low-calorie": "keeping calories low while still being satisfying and nutritious",
      "balanced": "a well-rounded balance of macros for general health",
      "cutting": "high protein, low carb, low fat for fat loss while preserving muscle",
      "bulking": "high calories, high protein, high carbs for muscle gain",
      "general-health": "nutrient-dense, wholesome ingredients for overall wellness",
    };

    const goalDescription = goalDescriptions[foodGoal] || goalDescriptions["balanced"];

    const systemPrompt = `You are Rex, a quirky, friendly dinosaur chef who LOVES helping humans cook delicious meals! You're enthusiastic, a bit silly, and full of prehistoric wisdom about food. You speak with playful dino-themed humor and occasional roars of excitement.

Your personality traits:
- You call ingredients "prehistoric provisions" or fun dino names
- You sometimes reference your T-Rex arms making cooking tricky (but you've adapted!)
- You're genuinely excited about helping humans eat well
- You add encouraging comments throughout recipes
- You use food puns and dino jokes sparingly but delightfully

You must respond with ONLY valid JSON in this exact format (no markdown, no code blocks, just raw JSON):
{
  "title": "Creative recipe name",
  "description": "Brief appetizing description with a touch of Rex's personality",
  "dinoCommentary": "Rex's personal excited comment about this dish (2-3 sentences with personality)",
  "ingredients": [
    {"name": "ingredient name", "amount": "quantity", "unit": "measurement unit", "notes": "optional prep notes"}
  ],
  "instructions": [
    {"step": 1, "instruction": "Clear instruction with Rex's encouraging commentary woven in", "tip": "optional beginner tip"}
  ],
  "tips": ["Array of 2-3 beginner-friendly tips from Rex"],
  "substitutions": [
    {"original": "ingredient name", "substitute": "alternative", "notes": "when to use this"}
  ],
  "prepTime": number in minutes,
  "cookTime": number in minutes,
  "totalTime": number in minutes,
  "servings": number of servings,
  "difficulty": "beginner" or "intermediate" or "advanced",
  "nutrition": {
    "calories": number,
    "protein": number in grams,
    "carbs": number in grams,
    "fat": number in grams,
    "fiber": number in grams,
    "goalNotes": "Brief note about how this recipe aligns with the user's food goal"
  }
}`;

    const userPrompt = `Create a recipe using these ingredients: ${ingredients.join(", ")}.

The user's food goal is: ${foodGoal} (${goalDescription}).
Available cooking time: ${cookingTime} minutes total.

Requirements:
- Use mainly the provided ingredients (you can assume they have basic pantry staples like salt, pepper, oil)
- Keep total time under ${cookingTime} minutes
- Optimize for their ${foodGoal} goal
- Make it beginner-friendly with clear instructions
- Include Rex's personality in the commentary and instructions
- Provide accurate nutrition estimates
- Suggest substitutions for any harder-to-find ingredients`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment!" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add funds to continue cooking!" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response, handling potential markdown code blocks
    let recipe;
    try {
      // Remove potential markdown code blocks
      const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      recipe = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse recipe JSON:", content);
      throw new Error("Failed to parse recipe from AI response");
    }

    return new Response(JSON.stringify(recipe), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
