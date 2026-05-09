"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Icon } from "@/components/ui/Icon";

// --- Types ---
interface MacroData {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

interface FoodEntry {
  id: string;
  recipeId: string;
  name: string;
  portionGrams: number;
  macros: MacroData;
}

interface MealLog {
  breakfast: FoodEntry[];
  dinner: FoodEntry[];
  snacks: FoodEntry[];
}

type MealType = "breakfast" | "dinner" | "snacks";

// --- Hardcoded Recipes ---
const PUPSY_RECIPES = [
  {
    id: "veg",
    name: "Paneer & Rice",
    description: "Paneer, Moong Dal, & Fresh Veggies",
    macrosPer100g: { protein: 7.5, fat: 6.8, carbs: 10.0, calories: 130 }
  },
  {
    id: "senior",
    name: "Chicken & Quinoa",
    description: "Chicken, Quinoa, & Bone Broth (Lower Carbs & Kcal)",
    macrosPer100g: { protein: 7.6, fat: 1.8, carbs: 5.3, calories: 88 }
  },
  {
    id: "chicken_rice",
    name: "Chicken & Rice",
    description: "Chicken Breast, Liver, Eggs, & Rice",
    macrosPer100g: { protein: 13.0, fat: 7.2, carbs: 7.3, calories: 149 }
  }
];

export default function WellnessTracker() {
  const [profile, setProfile] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Date State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Daily Log State
  const [mealLogs, setMealLogs] = useState<MealLog>({ breakfast: [], dinner: [], snacks: [] });
  const [weight, setWeight] = useState("");
  const [energy, setEnergy] = useState<"low" | "moderate" | "high" | "">("");

  // Modal & API State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMealType, setActiveMealType] = useState<MealType>("breakfast");
  const [searchTab, setSearchTab] = useState<"pupsy" | "api">("pupsy");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<typeof PUPSY_RECIPES[0] | null>(null);
  const [portion, setPortion] = useState<string>("100");
  const [apiResults, setApiResults] = useState<any[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // Setup Flow State
  const [showSetup, setShowSetup] = useState(false);
  const [setupWeight, setSetupWeight] = useState("");
  const [setupActivity, setSetupActivity] = useState<"low" | "moderate" | "high">("moderate");
  const [isSavingSetup, setIsSavingSetup] = useState(false);

  useEffect(() => {
    fetchDataForDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchDataForDate = async (dateObj: Date) => {
    setIsCheckingAuth(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsLoggedIn(true);
        const { data: dogs } = await supabase
          .from("dog_profiles")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (dogs && dogs.length > 0) {
          const d = dogs[0];
          setProfile({
            id: d.id,
            name: d.name,
            weight: d.weight_kg ? String(d.weight_kg) : "",
            activity: d.activity_level || "",
          });

          // Check if setup is needed
          if (!d.weight_kg || !d.activity_level) {
             setShowSetup(true);
             setIsCheckingAuth(false);
             return; // Stop loading diary if setup is required
          }
          
          const dateString = dateObj.toLocaleDateString('en-CA');
          const { data: log } = await supabase
            .from("wellness_logs")
            .select("*")
            .eq("dog_profile_id", d.id)
            .eq("log_date", dateString)
            .single();
            
          if (log) {
            setWeight(log.weight ? String(log.weight) : String(d.weight_kg));
            setEnergy((log.energy as any) || d.activity_level);
            
            if (log.meal) {
              try {
                const parsedMeals = JSON.parse(log.meal);
                setMealLogs({
                  breakfast: parsedMeals.breakfast || [],
                  dinner: parsedMeals.dinner || [],
                  snacks: parsedMeals.snacks || []
                });
              } catch (e) {
                setMealLogs({ breakfast: [], dinner: [], snacks: [] });
              }
            } else {
               setMealLogs({ breakfast: [], dinner: [], snacks: [] });
            }
          } else {
            // New day, default to profile weight and activity
            setWeight(String(d.weight_kg));
            setEnergy(d.activity_level);
            setMealLogs({ breakfast: [], dinner: [], snacks: [] });
          }
        }
      } else {
         setIsLoggedIn(false);
      }
    } catch (e) {
       console.warn("Failed to fetch profile for wellness", e);
    }
    setIsCheckingAuth(false);
  };

  const handleCompleteSetup = async () => {
    if (!setupWeight || isNaN(parseFloat(setupWeight))) return alert("Please enter a valid weight.");
    setIsSavingSetup(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("dog_profiles").update({
         weight_kg: parseFloat(setupWeight),
         activity_level: setupActivity
      }).eq("id", profile.id);
      
      setProfile({ ...profile, weight: setupWeight, activity: setupActivity });
      setWeight(setupWeight);
      setEnergy(setupActivity);
      setShowSetup(false);
    } catch (e) {
       alert("Failed to save profile setup.");
    }
    setIsSavingSetup(false);
  };

  // --- External API Search ---
  const searchExternalApi = async () => {
    if (!searchQuery) return;
    setIsSearchingApi(true);
    try {
      const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(searchQuery)}&api_key=DEMO_KEY&pageSize=10`);
      const data = await res.json();
      
      if (data.foods) {
        const mapped = data.foods.map((f: any) => {
           // USDA returns nutrients per 100g
           const getNutrient = (name: string) => f.foodNutrients.find((n:any) => n.nutrientName.toLowerCase().includes(name.toLowerCase()))?.value || 0;
           return {
             id: String(f.fdcId),
             name: f.description.toLowerCase(),
             description: f.brandOwner ? `Brand: ${f.brandOwner}` : "Generic Food",
             macrosPer100g: {
               protein: getNutrient("protein"),
               fat: getNutrient("total lipid (fat)"),
               carbs: getNutrient("carbohydrate, by difference"),
               calories: getNutrient("energy")
             }
           };
        });
        setApiResults(mapped);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch external food data.");
    }
    setIsSearchingApi(false);
  };

  useEffect(() => {
    if (searchTab === "api") {
      const timeoutId = setTimeout(() => {
        searchExternalApi();
      }, 800);
      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchTab]);

  // --- Calculations ---
  const dogName = profile?.name || "your dog";
  const weightNum = parseFloat(weight) || (profile?.weight ? parseFloat(profile.weight) : 0);
  const currentEnergyLevel = (energy || profile?.activity || "moderate") as "low" | "moderate" | "high";
  
  // NEW FORMULA: Weight * 20 * Multiplier
  const baseGoal = weightNum * 20;
  const energyMultipliers: Record<"low" | "moderate" | "high", number> = { "low": 0.8, "moderate": 1.0, "high": 1.2 };
  const dailyCalorieGoal = Math.round(baseGoal * energyMultipliers[currentEnergyLevel]);

  // Aggregate Macros
  const allEntries = [...mealLogs.breakfast, ...mealLogs.dinner, ...mealLogs.snacks];
  const totalMacros = allEntries.reduce(
    (acc, entry) => ({
      protein: acc.protein + entry.macros.protein,
      fat: acc.fat + entry.macros.fat,
      carbs: acc.carbs + entry.macros.carbs,
      calories: acc.calories + entry.macros.calories,
    }),
    { protein: 0, fat: 0, carbs: 0, calories: 0 }
  );

  const calPercent = Math.min(100, Math.max(0, Math.round((totalMacros.calories / dailyCalorieGoal) * 100)));
  const caloriesRemaining = Math.max(0, dailyCalorieGoal - totalMacros.calories);

  // --- Handlers ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && profile?.id) {
        const dateString = selectedDate.toLocaleDateString('en-CA');
        const mealJson = JSON.stringify(mealLogs);
        
        await supabase
          .from("wellness_logs")
          .upsert({
            user_id: user.id,
            dog_profile_id: profile.id,
            log_date: dateString,
            weight: weight ? parseFloat(weight) : null,
            calories: totalMacros.calories,
            energy: energy || null,
            meal: mealJson,
          }, { onConflict: 'dog_profile_id, log_date' });
      }
      alert("Diary saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save diary.");
    } finally {
      setIsSaving(false);
    }
  };

  const openFoodModal = (type: MealType) => {
    setActiveMealType(type);
    setSelectedRecipe(null);
    setSearchQuery("");
    setSearchTab("pupsy");
    setPortion("100");
    setIsModalOpen(true);
  };

  const addFoodToMeal = () => {
    if (!selectedRecipe) return;
    const p = parseFloat(portion) || 0;
    if (p <= 0) return;

    const multiplier = p / 100;
    const entry: FoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      recipeId: selectedRecipe.id,
      name: selectedRecipe.name,
      portionGrams: p,
      macros: {
        protein: Math.round(selectedRecipe.macrosPer100g.protein * multiplier * 10) / 10,
        fat: Math.round(selectedRecipe.macrosPer100g.fat * multiplier * 10) / 10,
        carbs: Math.round(selectedRecipe.macrosPer100g.carbs * multiplier * 10) / 10,
        calories: Math.round(selectedRecipe.macrosPer100g.calories * multiplier),
      }
    };

    setMealLogs(prev => ({
      ...prev,
      [activeMealType]: [...prev[activeMealType], entry]
    }));
    setIsModalOpen(false);
  };

  const removeEntry = (type: MealType, id: string) => {
    setMealLogs(prev => ({
      ...prev,
      [type]: prev[type].filter(e => e.id !== id)
    }));
  };

  // --- Dates ---
  const handlePrevDay = () => setSelectedDate(new Date(selectedDate.getTime() - 86400000));
  const handleNextDay = () => setSelectedDate(new Date(selectedDate.getTime() + 86400000));
  const dateStr = selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  const isToday = selectedDate.toLocaleDateString() === new Date().toLocaleDateString();

  if (isCheckingAuth) return <LoadingScreen />;
  if (!isLoggedIn) return <AuthScreen />;

  // Setup Screen
  if (showSetup) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Nav />
        <main className="flex-1 py-12 px-6 flex items-center justify-center">
          <div className="card-container bg-white p-8 md:p-12 max-w-[500px] w-full text-center fade-in shadow-xl border border-[var(--color-border)]">
             <Icon name="paw" size={48} className="text-accent/30 mx-auto mb-6" />
             <h1 className="headline-xl text-3xl mb-3">Let's set up your diary</h1>
             <p className="text-muted-foreground mb-8 text-sm">We need {dogName}'s weight and activity level to calculate their exact daily caloric goals.</p>
             
             <div className="space-y-6 text-left">
                <div>
                  <label className="text-sm font-medium mb-2 block">Current Weight (kg)</label>
                  <input type="number" step="0.1" value={setupWeight} onChange={(e) => setSetupWeight(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-input)] px-4 py-3 bg-background focus:ring-2 focus:ring-accent outline-none text-base"
                    placeholder="e.g. 15.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Activity Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["low", "moderate", "high"].map((level) => (
                      <button key={level} onClick={() => setSetupActivity(level as any)}
                        className={`px-3 py-3 rounded-xl text-xs font-medium border transition-all capitalize ${setupActivity === level ? "bg-accent text-white border-accent shadow-sm" : "bg-muted/10 text-muted-foreground border-[var(--color-border)] hover:border-accent/50"}`}
                      >
                        {level === "low" ? "Sedentary" : level}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
             
             <button onClick={handleCompleteSetup} disabled={isSavingSetup} className="btn-pill-primary w-full py-4 mt-8 text-base disabled:opacity-50">
               {isSavingSetup ? "Saving..." : "Start Tracking"}
             </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredRecipes = PUPSY_RECIPES.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayList = searchTab === "pupsy" ? filteredRecipes : apiResults;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav />
      <main className="flex-1 py-12 px-6 md:py-20">
        <div className="mx-auto max-w-[800px] space-y-8 fade-in">
          
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors mb-2">
            <Icon name="paw" size={14} /> Back to Dashboard
          </Link>

          {/* Date Navigator */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-[var(--color-border)] shadow-sm max-w-[400px] mx-auto">
            <button onClick={handlePrevDay} className="p-3 hover:bg-muted/20 rounded-xl transition-colors text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="text-center">
              <span className="font-serif text-lg text-foreground block">{isToday ? "Today" : dateStr}</span>
            </div>
            <button onClick={handleNextDay} className="p-3 hover:bg-muted/20 rounded-xl transition-colors text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* Macro Summary (Top Widget) */}
          <div className="card-container bg-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm border border-[var(--color-border)]">
            <div className="relative h-36 w-36 shrink-0">
              <svg className="h-full w-full drop-shadow-sm -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#f0eae1]" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-accent" strokeDasharray={`${calPercent}, 100`} strokeLinecap="round" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ transition: "stroke-dasharray 1s ease-out" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{caloriesRemaining}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mt-1">Remaining</span>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-4">
               <div className="flex justify-between items-end mb-1 text-sm font-medium">
                 <span>Daily Goal: <span className="font-bold text-accent">{dailyCalorieGoal} kcal</span></span>
                 <span>Food: {Math.round(totalMacros.calories)} kcal</span>
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <MacroBar label="Carbs" value={totalMacros.carbs} color="bg-amber-400" />
                  <MacroBar label="Fat" value={totalMacros.fat} color="bg-rose-400" />
                  <MacroBar label="Protein" value={totalMacros.protein} color="bg-emerald-400" />
               </div>
            </div>
          </div>

          {/* Diary Lists */}
          <div className="space-y-6">
            <MealSection title="Breakfast" type="breakfast" entries={mealLogs.breakfast} onAdd={() => openFoodModal("breakfast")} onRemove={removeEntry} />
            <MealSection title="Dinner" type="dinner" entries={mealLogs.dinner} onAdd={() => openFoodModal("dinner")} onRemove={removeEntry} />
            <MealSection title="Snacks" type="snacks" entries={mealLogs.snacks} onAdd={() => openFoodModal("snacks")} onRemove={removeEntry} />
          </div>

          {/* Health Stats */}
          <div className="card-container bg-white shadow-sm border border-[var(--color-border)] overflow-hidden">
             <div className="bg-muted/30 px-6 py-4 border-b border-[var(--color-border)]">
               <h3 className="font-serif text-lg">Daily Vitals</h3>
             </div>
             <div className="divide-y divide-[var(--color-border)]">
                <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] items-center px-6 py-5 gap-4">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">Energy</label>
                  <div className="flex gap-2">
                    {["low", "moderate", "high"].map((level) => (
                      <button key={level} onClick={() => setEnergy(energy === level ? "" : level as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${energy === level ? "bg-accent text-white border-accent shadow-sm" : "bg-background text-muted-foreground border-[var(--color-border)] hover:border-accent/50"}`}
                      >
                        {level === "low" ? "Sedentary" : level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] items-center px-6 py-5 gap-4">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">Weight</label>
                  <div className="relative max-w-[200px]">
                    <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)}
                      className="w-full rounded-xl border border-[var(--color-input)] px-4 py-2.5 bg-background focus:ring-2 focus:ring-accent outline-none text-sm pr-10"
                      placeholder="e.g. 12.5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">kg</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Save Action */}
          <div className="pt-4 pb-12">
             <button onClick={handleSave} disabled={isSaving} className="btn-pill-primary w-full py-4 text-lg disabled:opacity-50 shadow-md hover:shadow-lg">
                {isSaving ? "Saving Diary..." : "Complete Diary"}
             </button>
          </div>
        </div>
      </main>

      {/* Add Food Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}>
          <div className="bg-background w-full md:w-[500px] md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh] md:h-[600px]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-white">
              <h3 className="font-serif text-xl capitalize">Add to {activeMealType}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            
            <div className="bg-white border-b border-[var(--color-border)] flex">
               <button onClick={() => setSearchTab("pupsy")} className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${searchTab === "pupsy" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:bg-muted/10"}`}>Pupsy Recipes</button>
               <button onClick={() => setSearchTab("api")} className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${searchTab === "api" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:bg-muted/10"}`}>Search All Foods</button>
            </div>

            <div className="p-4 bg-muted/20">
              <input type="text" placeholder={searchTab === "pupsy" ? "Search recipes..." : "Search generic foods (e.g. Apple, Egg)"} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-input)] px-4 py-3 bg-white focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm"
              />
            </div>

            <div className="overflow-y-auto flex-1 p-2 bg-white relative">
               {!selectedRecipe ? (
                 <div className="space-y-1">
                   {isSearchingApi && searchTab === "api" && <p className="text-center text-muted-foreground p-8 animate-pulse">Searching USDA Database...</p>}
                   {!isSearchingApi && displayList.map(recipe => (
                     <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} className="p-4 rounded-xl hover:bg-muted/10 cursor-pointer transition-colors flex justify-between items-center group border-b border-[var(--color-border)] last:border-0">
                       <div className="flex-1 pr-4">
                         <h4 className="font-medium text-foreground group-hover:text-accent transition-colors capitalize">{recipe.name}</h4>
                         <p className="text-xs text-muted-foreground mt-1 truncate">{recipe.description}</p>
                       </div>
                       <div className="text-right shrink-0">
                         <span className="text-sm font-bold">{Math.round(recipe.macrosPer100g.calories)}</span>
                         <span className="text-[10px] text-muted-foreground block">kcal / 100g</span>
                       </div>
                     </div>
                   ))}
                   {!isSearchingApi && displayList.length === 0 && <p className="text-center text-muted-foreground p-8">No foods found.</p>}
                 </div>
               ) : (
                 <div className="p-6 fade-in h-full flex flex-col bg-white">
                   <button onClick={() => setSelectedRecipe(null)} className="text-xs text-accent font-medium mb-4 flex items-center gap-1">← Back to search</button>
                   <h4 className="font-serif text-2xl mb-1 capitalize">{selectedRecipe.name}</h4>
                   <p className="text-sm text-muted-foreground mb-6">{selectedRecipe.description}</p>

                   <div className="bg-muted/10 rounded-2xl border border-[var(--color-border)] p-5 mb-auto shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <label className="text-sm font-medium">Serving Size (g)</label>
                        <input type="number" value={portion} onChange={(e) => setPortion(e.target.value)} className="w-24 text-right rounded-lg border border-[var(--color-input)] px-3 py-2 bg-white focus:ring-2 focus:ring-accent outline-none text-lg font-bold shadow-sm" />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center pt-6 border-t border-[var(--color-border)]">
                         <div className="flex flex-col">
                           <span className="text-2xl font-bold">{Math.round(selectedRecipe.macrosPer100g.calories * (parseFloat(portion||"0")/100))}</span>
                           <span className="text-[10px] uppercase text-muted-foreground mt-1">Calories</span>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-lg font-bold text-amber-500">{Math.round(selectedRecipe.macrosPer100g.carbs * (parseFloat(portion||"0")/100)*10)/10}g</span>
                           <span className="text-[10px] uppercase text-muted-foreground mt-1">Carbs</span>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-lg font-bold text-rose-500">{Math.round(selectedRecipe.macrosPer100g.fat * (parseFloat(portion||"0")/100)*10)/10}g</span>
                           <span className="text-[10px] uppercase text-muted-foreground mt-1">Fat</span>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-lg font-bold text-emerald-500">{Math.round(selectedRecipe.macrosPer100g.protein * (parseFloat(portion||"0")/100)*10)/10}g</span>
                           <span className="text-[10px] uppercase text-muted-foreground mt-1">Protein</span>
                         </div>
                      </div>
                   </div>

                   <button onClick={addFoodToMeal} className="btn-pill-primary w-full py-4 text-lg mt-6">Add to Diary</button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

// --- Helper Components ---
function MealSection({ title, type, entries, onAdd, onRemove }: { title: string, type: MealType, entries: FoodEntry[], onAdd: () => void, onRemove: (t:MealType, id:string)=>void }) {
  const totalCals = entries.reduce((s, e) => s + e.macros.calories, 0);
  
  return (
    <div className="card-container bg-white shadow-sm border border-[var(--color-border)] overflow-hidden">
      <div className="bg-muted/10 px-5 py-4 border-b border-[var(--color-border)] flex justify-between items-center">
        <h3 className="font-serif text-xl">{title}</h3>
        <span className="font-bold text-accent">{totalCals} <span className="text-xs font-normal text-muted-foreground">kcal</span></span>
      </div>
      
      <div className="divide-y divide-[var(--color-border)]">
        {entries.map(entry => (
          <div key={entry.id} className="p-4 px-5 flex justify-between items-center group">
            <div>
              <p className="font-medium text-foreground capitalize">{entry.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{entry.portionGrams}g • {entry.macros.protein}g Protein, {entry.macros.fat}g Fat, {entry.macros.carbs}g Carbs</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">{entry.macros.calories}</span>
              <button onClick={() => onRemove(type, entry.id)} className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all px-2">✕</button>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="p-4 px-5 text-sm text-muted-foreground italic">No food logged yet.</div>
        )}
      </div>
      
      <div className="p-2 bg-white">
        <button onClick={onAdd} className="w-full py-3 text-sm font-medium text-accent hover:bg-accent/10 rounded-xl transition-colors flex justify-center items-center gap-2">
          <Icon name="check" size={14} className="text-accent" /> Add Food
        </button>
      </div>
    </div>
  );
}

function MacroBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="flex flex-col">
       <span className="text-[11px] text-muted-foreground mb-1">{label}</span>
       <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
         <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${Math.min(100, (value / 150)*100)}%` }} />
       </div>
       <span className="text-xs font-medium mt-1">{Math.round(value * 10)/10}g</span>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav /><main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground animate-pulse">Loading diary...</p></main><Footer />
    </div>
  );
}

function AuthScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav />
      <main className="flex-1 py-12 px-6 flex flex-col items-center justify-center text-center">
        <Icon name="paw" size={48} className="text-accent/30 mx-auto mb-6" />
        <h1 className="headline-xl text-3xl mb-4">Log in to Access Diary</h1>
        <p className="text-muted-foreground max-w-sm mb-8">You need a Pupsy account to log food and track macros.</p>
        <Link href="/auth" className="btn-pill-primary">Sign In</Link>
      </main>
      <Footer />
    </div>
  );
}
