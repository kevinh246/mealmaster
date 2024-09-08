"use client";

import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export default function MealPlan({ name }: { name: string }) {
  const router = useRouter();
  // const [myMealPlan, setMyMealPlan] = useState<any[]>([]);

  const mealPlanRef = useRef<HTMLDivElement>(null);

  // States to keep track of all meal plan from Monday - Sunday
  const [mondayMealPlan, setMondayMealPlan] = useState<any>();
  const [tuesdayMealPlan, setTuesdayMealPlan] = useState<any>();
  const [wednesdayMealPlan, setWednesdayMealPlan] = useState<any>();
  const [thursdayMealPlan, setThursdayMealPlan] = useState<any>();
  const [fridayMealPlan, setFridayMealPlan] = useState<any>();
  const [saturdayMealPlan, setSaturdayMealPlan] = useState<any>();
  const [sundayMealPlan, setSundayMealPlan] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("diaryPreference");
    setIsLoading(true);

    // Ensure window is defined
    if (typeof window !== "undefined") {
      const mealPlan = localStorage.getItem("currentMealPlan");
      if (mealPlan) {
        const parsedMealPlan = JSON.parse(mealPlan);
        // setMyMealPlan(parsedMealPlan);

        setMondayMealPlan(JSON.parse(parsedMealPlan)[0]);
        setTuesdayMealPlan(JSON.parse(parsedMealPlan)[1]);
        setWednesdayMealPlan(JSON.parse(parsedMealPlan)[2]);
        setThursdayMealPlan(JSON.parse(parsedMealPlan)[3]);
        setFridayMealPlan(JSON.parse(parsedMealPlan)[4]);
        setSaturdayMealPlan(JSON.parse(parsedMealPlan)[5]);
        setSundayMealPlan(JSON.parse(parsedMealPlan)[6]);
        // console.log(JSON.parse(parsedMealPlan)[0]);
        setIsLoading(false);
      } 
      else {
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
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-5 rounded-sm"
            >
              Print PDF
            </button>
          )}
          content={() => mealPlanRef.current}
        />
      </div>

      {/* Print all below to pdf */}
      <div className="border border-gray-300 px-10 py-3 rounded-md mt-5 mb-10 shadow-xl" ref={mealPlanRef}>
        <h2 className="text-center text-2xl font-medium mt-5 mb-10">
          {name}'s Meal Plan
        </h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
            <>
              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{mondayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {mondayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {mondayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {mondayMealPlan?.dinner}
                </p>
              </div>

              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{tuesdayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {tuesdayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {tuesdayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {tuesdayMealPlan?.dinner}
                </p>
              </div>

              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{wednesdayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {wednesdayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {wednesdayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {wednesdayMealPlan?.dinner}
                </p>
              </div>

              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{thursdayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {thursdayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {thursdayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {thursdayMealPlan?.dinner}
                </p>
              </div>

              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{fridayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {fridayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {fridayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {fridayMealPlan?.dinner}
                </p>
              </div>

              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{saturdayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {saturdayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {saturdayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {saturdayMealPlan?.dinner}
                </p>
              </div>

              <div className="mb-10 mt-5">
                <h3 className="text-2xl font-medium mb-3">{sundayMealPlan?.day}</h3>
                <p>
                  <span className="font-medium">Breakfast:</span>{" "}
                  {sundayMealPlan?.breakfast}
                </p>
                <p>
                  <span className="font-medium">Lunch:</span> {sundayMealPlan?.lunch}
                </p>
                <p>
                  <span className="font-medium">Dinner:</span> {sundayMealPlan?.dinner}
                </p>
              </div>
            </>
        )}

      </div>
    </Container>
  );
}
