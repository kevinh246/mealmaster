"use client";

import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MealPlan({ name }: { name: string }) {
  const router = useRouter();
  const [myMealPlan, setMyMealPlan] = useState<any[]>([]);
  useEffect(() => {
    // Ensure window is defined
    if (typeof window !== "undefined") {
      const mealPlan = localStorage.getItem("currentMealPlan");
      if (mealPlan) {
        const parsedMealPlan = JSON.parse(mealPlan);
        console.log(parsedMealPlan);
        setMyMealPlan(parsedMealPlan);
      } else {
        // Redirect if meal preferences page if currentMealPlan isn't in localStorage
        router.push("/dashboard/meal-preference");
      }
    }
  }, [router]);

  return (
    <Container>
      <h1 className="text-4xl font-bold text-black font-sans block text-center mt-[10vh]">
        Your meal plan is ready!
      </h1>
      <p className="text-center mt-3 mb-5">
        Take a look at what we have prepared for you
      </p>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-5 rounded-sm"
        >
          Print PDF
        </button>
      </div>

      {/* Print all below to pdf */}
      <div className="border border-gray-300 px-10 py-3 rounded-md mt-5 mb-10 shadow-xl">
        <h2 className="text-center text-2xl font-medium mt-5 mb-10">
          {name}'s Meal Plan
        </h2>
        {myMealPlan.length > 0 ? (
          myMealPlan.map((dayPlan, index) => (
            <div key={index} className="mb-10 mt-5">
              <h3 className="text-2xl font-medium mb-3">{dayPlan.day}</h3>
              <p>
                <span className="font-medium">Breakfast:</span>{" "}
                {dayPlan.breakfast}
              </p>
              <p>
                <span className="font-medium">Lunch:</span> {dayPlan.lunch}
              </p>
              <p>
                <span className="font-medium">Dinner:</span> {dayPlan.dinner}
              </p>
            </div>
          ))
        ) : (
          <p>Loading meal plan...</p>
        )}
      </div>
    </Container>
  );
}
