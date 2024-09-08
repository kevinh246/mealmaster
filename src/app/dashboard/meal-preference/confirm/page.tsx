"use client";

import { saveMealPreferenceGroup } from "@/actions/action";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [mealPreferencesGroup, setMealPreferencesGroup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Ensure window is defined
    if (typeof window !== "undefined") {
      const vegetables = JSON.parse(localStorage.getItem("vegetablesPreference") || "[]");
      const dairy = JSON.parse(localStorage.getItem("dairyPreference")!);
      const meat = JSON.parse(localStorage.getItem("meatPreference") || "[]");
      const grains = JSON.parse(localStorage.getItem("grainsPreference") || "[]");
      const fruits = JSON.parse(localStorage.getItem("fruitsPreference") || "[]");
      const seafood = JSON.parse(localStorage.getItem("seafoodPreference") || "[]");

      // console.log(dairy)
      
      if (vegetables?.length || dairy?.length || meat?.length || grains?.length || fruits?.length || seafood?.length) {
        setMealPreferencesGroup({
          Vegetables: vegetables,
          Dairy: dairy,
          Meat: meat,
          Grain: grains,
          Fruit: fruits,
          Seafood: seafood
        });
      } else {
        // Redirect if no meal preferences are set
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

  async function generateMealPlan() {
    setIsLoading(true);
    // console.log(JSON.stringify(mealPreferencesGroup));

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
      // Save the currently generated meal plan to localStorage
      localStorage.setItem(
        "currentMealPlan",
        JSON.stringify(recommendedMealPlan["content"])
      );

      // Clear all other preferences
      localStorage.removeItem("vegetablesPreference");
      localStorage.removeItem("diaryPreference");
      localStorage.removeItem("meatPreference");
      localStorage.removeItem("grainsPreference");
      localStorage.removeItem("fruitsPreference");
      localStorage.removeItem("seafoodPreference");

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
        {Object.keys(mealPreferencesGroup).map((category) => (
          <div key={category} className="border bg-gray-50 px-5 py-3">
            <h2 className="text-center font-medium">{category}</h2>
            <ul className="list-disc ms-5 mt-5">
              {mealPreferencesGroup[category].map((item: any, index: any) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
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