"use client";

import { saveMealPreferenceGroup } from "@/actions/action";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [userMealPreference, setUserMealPreference] = useState<any>(null);
  const [mealPreferencesGroup, setMealPreferencesGroup] = useState<any>(null);

  useEffect(() => {
    // Ensure window is defined
    if (typeof window !== "undefined") {
      const storedPreferences = localStorage.getItem("mealPreferencesGroup");
      if (storedPreferences) {
        const parsedPreferences = JSON.parse(storedPreferences);
        setMealPreferencesGroup(parsedPreferences);
        setUserMealPreference(parsedPreferences);
        checkValidMealPreferences(parsedPreferences);
      } else {
        // Redirect if meal preferences are not set
        router.push("/dashboard/meal-preference");
      }
    }
  }, [router]);

  function checkValidMealPreferences(preferences: any) {
    if (!preferences) {
      router.push("/dashboard/meal-preference");
    } else {
      // Extract preferences and save to DB
      const {
        Vegetables: vegetablesPreference,
        Dairy: dairyPreference,
        Meat: meatPreference,
        Grain: grainsPreference,
        Fruit: fruitsPreference,
        Seafood: seafoodPreference,
      } = preferences;

      saveMealPreferenceGroup(
        vegetablesPreference,
        dairyPreference,
        meatPreference,
        grainsPreference,
        fruitsPreference,
        seafoodPreference
      );
      console.log("User's meal preference saved to database");
    }
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function generateMealPlan() {
    setIsLoading(true);
    console.log(mealPreferencesGroup);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/meal-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: JSON.stringify(mealPreferencesGroup),
          }),
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch recommended meal plan.");
      }

      const recommendedMealPlan = await response.json();
      // console.log(JSON.parse(recommendedMealPlan["content"])[0]);
      // Save the currently generated meal plan to localStorage
      localStorage.setItem(
        "currentMealPlan",
        JSON.parse(JSON.stringify(recommendedMealPlan["content"]))
      );

      // Clear all other preferences
      localStorage.removeItem("vegetablesPreference");
      localStorage.removeItem("diaryPreference");
      localStorage.removeItem("meatPreference");
      localStorage.removeItem("grainsPreference");
      localStorage.removeItem("fruitsPreference");
      localStorage.removeItem("seafoodPreference");
      localStorage.removeItem("mealPreferencesGroup");

      setIsLoading(false);
      router.push("/dashboard/meal-plan");
    } 
    catch (error: any) {
      setIsLoading(false);
      console.error(error.message);
    }
  }

  if (!mealPreferencesGroup) {
    return <p>Loading...</p>; // Show a loading state while preferences are being fetched
  }

  return (
    <Container>
      <h1 className="text-4xl font-bold text-black font-sans block text-center mt-[10vh]">
        Confirm meal selection
      </h1>
      <p className="text-center mt-3">You have selected the following</p>

      <div className="grid grid-cols-3 gap-3 gap-y-5 mx-auto max-w-2xl mt-5 lg:px-8">
        {["Vegetables", "Dairy", "Meat", "Grain", "Fruit", "Seafood"].map(
          (category) => (
            <div key={category} className="border bg-gray-50 px-5 py-3">
              <h2 className="text-center font-medium">{category}</h2>
              <ul className="list-disc ms-5 mt-5">
                {mealPreferencesGroup[category]?.map(
                  (item: any, index: any) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          )
        )}
      </div>

      <div className="text-center mt-5">
        <button
          type="button"
          className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full mx-auto w-full max-w-lg"
          onClick={generateMealPlan}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Generate meal plan"}
        </button>
      </div>
    </Container>
  );
}
