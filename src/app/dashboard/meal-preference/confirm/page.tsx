"use client";


import Container from '@/components/Container'
import ChooseVegetablesModal from './ChooseVegetablesModal';
import { useState } from 'react';
import ChooseDairyModal from './ChooseDairyModal';
import ChooseMeatsModal from './ChooseMeatsModal';
import ChooseGrainsModal from './ChooseGrainsModal';
import ChooseFruitsModal from './ChooseFruitsModal';
import ChooseSeafoodModal from './ChooseSeafoodModal';
import { useRouter } from 'next/navigation';


export default function Page() {


 const router = useRouter();


 const [openVegetablesModal, setOpenVegetablesModal] = useState<boolean>(false);
 const [openDairyModal, setOpenDairyModal] = useState<boolean>(false);
 const [openMeatModal, setOpenMeatModal] = useState<boolean>(false);
 const [openGrainModal, setOpenGrainModal] = useState<boolean>(false);
 const [openFruitModal, setOpenFruitModal] = useState<boolean>(false);
 const [openSeafoodModal, setOpenSeafoodModal] = useState<boolean>(false);


 const [invalidPreferences, setInvalidPreferences] = useState<string[]>([]);


 const checkItemsSelection = () => {
   const vegetablesPreference = JSON.parse(localStorage.getItem("vegetablesPreference") || "[]");
   const dairyPreference = JSON.parse(localStorage.getItem("dairyPreference") || "[]");
   const meatPreference = JSON.parse(localStorage.getItem("meatPreference") || "[]");
   const grainsPreference = JSON.parse(localStorage.getItem("grainsPreference") || "[]");
   const fruitsPreference = JSON.parse(localStorage.getItem("fruitsPreference") || "[]");
   const seafoodPreference = JSON.parse(localStorage.getItem("seafoodPreference") || "[]");


   const isValidArray = (arr: any) => Array.isArray(arr) && arr.length > 0;


   const checks = {
     Vegetables: isValidArray(vegetablesPreference),
     Dairy: isValidArray(dairyPreference),
     Meat: isValidArray(meatPreference),
     Grain: isValidArray(grainsPreference),
     Fruit: isValidArray(fruitsPreference),
     Seafood: isValidArray(seafoodPreference),
   };


   const invalidItems = Object.entries(checks)
     .filter(([_, isValid]) => !isValid)
     .map(([key]) => key);


   if (invalidItems.length > 0) {
     console.error(`The following items need to have one or more selections: ${invalidItems.join(', ')}`);
     setInvalidPreferences(invalidItems);
   }
   else {
     // console.log("All preferences are valid.");
     localStorage.setItem("mealPreferencesGroup", JSON.stringify(
       {
         Vegetables: vegetablesPreference,
         Dairy: dairyPreference,
         Meat: meatPreference,
         Grain: grainsPreference,
         Fruit: fruitsPreference,
         Seafood: seafoodPreference,
       }
     ))
     setInvalidPreferences([]);
     router.push("/dashboard/meal-preference/confirm");
   }
 };


 return (
   <>
     <Container>
       <h1 className="text-4xl font-bold text-black font-sans block text-center mt-[10vh]">
         Choose meal preference
       </h1>
       <p className="text-center mt-3">Select the food items that you prefer from these categories</p>


       <div className="grid grid-cols-3 gap-3 gap-y-5 mx-auto max-w-lg mt-5 lg:px-8">
         <div
           className="border rounded-md hover:bg-blue-50 w-32 h-32 text-center cursor-pointer"
           onClick={() => setOpenVegetablesModal(true)}
         >
           <img
             src="/assets/imgs/broccoli.png"
             width={75}
             className="mx-auto mt-5"
             alt="Vegetables icon"
           />
           <p className="mt-1 text-sm">Vegetables</p>
         </div>
         <div
           className="border rounded-md hover:bg-blue-50 w-32 h-32 text-center cursor-pointer"
           onClick={() => setOpenDairyModal(true)}
         >
           <img
             src="/assets/imgs/milk.png"
             width={75}
             className="mx-auto mt-5"
             alt="Dairy icon"
           />
           <p className="mt-1 text-sm">Dairy</p>
         </div>
         <div
           className="border rounded-md hover:bg-blue-50 w-32 h-32 text-center cursor-pointer"
           onClick={() => setOpenMeatModal(true)} 
         >
           <img
             src="/assets/imgs/meat.png"
             width={75}
             className="mx-auto mt-5"
             alt="Meat icon"
           />
           <p className="mt-1 text-sm">Meat</p>
         </div>
         <div
           className="border rounded-md hover:bg-blue-50 w-32 h-32 text-center cursor-pointer"
           onClick={() => setOpenGrainModal(true)} 
         >
           <img
             src="/assets/imgs/bread.png"
             width={75}
             className="mx-auto mt-5"
             alt="Grains icon"
           />
           <p className="mt-1 text-sm">Grains</p>
         </div>
         <div
           className="border rounded-md hover:bg-blue-50 w-32 h-32 text-center cursor-pointer"
           onClick={() => setOpenFruitModal(true)}
         >
           <img
             src="/assets/imgs/fruits.png"
             width={75}
             className="mx-auto mt-5"
             alt="Fruits icon"
           />
           <p className="mt-1 text-sm">Fruits</p>
         </div>
         <div
           className="border rounded-md hover:bg-blue-50 w-32 h-32 text-center cursor-pointer"
           onClick={() => setOpenSeafoodModal(true)}
         >
           <img
             src="/assets/imgs/shrimp.png"
             width={75}
             className="mx-auto mt-5"
             alt="Seafood icon"
           />
           <p className="mt-1 text-sm">Seafood</p>
         </div>
       </div>


       <div className="text-center mt-5">
         <button
           type="button"
           className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full mx-auto w-full max-w-lg"
           onClick={checkItemsSelection}
         >
           Continue
         </button>


      
         {invalidPreferences.length > 0 && (
           <div className="bg-red-50 text-red-700 mt-5 px-2 py-2 mx-auto w-full max-w-lg">
             The following items need to have one or more item selected: <br />
             {invalidPreferences.join(', ')}
           </div>
         )}


       </div>
     </Container>




     <ChooseVegetablesModal
       openVegetablesModal={openVegetablesModal}
       setOpenVegetablesModal={setOpenVegetablesModal}
     />


     <ChooseDairyModal
       openDairyModal={openDairyModal}
       setOpenDairyModal={setOpenDairyModal}
     />


     <ChooseMeatsModal
       openMeatModal={openMeatModal}
       setOpenMeatModal={setOpenMeatModal}
     />


     <ChooseGrainsModal
       openGrainModal={openGrainModal}
       setOpenGrainModal={setOpenGrainModal}
     />


     <ChooseFruitsModal
       openFruitModal={openFruitModal}
       setOpenFruitModal={setOpenFruitModal}
     />


     <ChooseSeafoodModal
       openSeafoodModal={openSeafoodModal}
       setOpenSeafoodModal={setOpenSeafoodModal}
     />


   </>
 );
}
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
   if (typeof window !== 'undefined') {
     const storedPreferences = localStorage.getItem("mealPreferencesGroup");
     if (storedPreferences) {
       const parsedPreferences = JSON.parse(storedPreferences);
       setMealPreferencesGroup(parsedPreferences);
       setUserMealPreference(parsedPreferences);
       checkValidMealPreferences(parsedPreferences);
     }
     else {
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
       Seafood: seafoodPreference
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
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/meal-plan`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         prompt: JSON.stringify(mealPreferencesGroup),
       }),
     });


     if (!response.ok) {
       setIsLoading(false);
       throw new Error("Failed to fetch recommended meal plan.");
     }


     const recommendedMealPlan = await response.json();
     // console.log(JSON.parse(recommendedMealPlan["content"])[0]);
     // Save the currently generated meal plan to localStorage
     localStorage.setItem("currentMealPlan", JSON.parse(JSON.stringify(recommendedMealPlan["content"])));
    
     // Clear all other preferences
   //   localStorage.removeItem("vegetablesPreference");
   //   localStorage.removeItem("diaryPreference");
   //   localStorage.removeItem("meatPreference");
   //   localStorage.removeItem("grainsPreference");
   //   localStorage.removeItem("fruitsPreference");
   //   localStorage.removeItem("seafoodPreference");
   //   localStorage.removeItem("mealPreferencesGroup");


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
       {['Vegetables', 'Dairy', 'Meat', 'Grain', 'Fruit', 'Seafood'].map((category) => (
         <div key={category} className="border bg-gray-50 px-5 py-3">
           <h2 className="text-center font-medium">{category}</h2>
           <ul className="list-disc ms-5 mt-5">
             {mealPreferencesGroup[category]?.map((item: any, index: any) => (
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
          {isLoading ? "Loading..." :  "Generate meal plan"}
       </button>
     </div>
   </Container>
 );
}



