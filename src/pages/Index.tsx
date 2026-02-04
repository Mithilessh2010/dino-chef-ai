import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DinoMascot } from "@/components/DinoMascot";
import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles, Target, Clock, Leaf, ArrowRight } from "lucide-react";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Recipes",
      description: "Tell Rex your ingredients and get personalized recipes instantly",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal-Based Nutrition",
      description: "Muscle building, cutting, bulking - Rex tailors meals to your goals",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Aware Cooking",
      description: "Quick 15-minute meals or weekend feasts - you choose",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Full Nutrition Info",
      description: "Calories, protein, carbs, fats, and fiber for every recipe",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 leaf-pattern">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Mascot */}
          <DinoMascot mood="excited" size="xl" className="mx-auto" />

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="dino-gradient-text">DinoChef</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your prehistoric AI kitchen companion. Turn whatever's in your fridge into 
              <span className="text-primary font-semibold"> delicious, goal-oriented meals!</span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="text-lg px-8 py-6 dino-glow animate-pulse-glow"
            >
              Start Cooking
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Free to use • No credit card needed
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 mx-auto flex justify-center">
              <div className="w-1.5 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why cook with <span className="text-primary">Rex</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Because your quirky dino chef makes healthy eating fun, personalized, and delicious!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="dino-card text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 footprint-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How it works 🦕
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg">Add Ingredients</h3>
              <p className="text-muted-foreground text-sm">
                Tell Rex what you have in your fridge or pantry
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg">Set Your Goal</h3>
              <p className="text-muted-foreground text-sm">
                Choose your nutrition goal and available cooking time
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg">Get Your Recipe!</h3>
              <p className="text-muted-foreground text-sm">
                Rex creates a personalized recipe with full nutrition info
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/auth")}
            size="lg"
            className="mt-12"
          >
            Try It Now - It's Free! 🦖
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DinoMascot mood="happy" size="sm" animate={false} />
            <span className="font-bold text-lg">DinoChef</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with 🦕 and AI magic • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
