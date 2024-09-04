"use client";


import { useState } from "react";
import Container from "@/components/Container";
import { completeOnboarding } from "@/actions/action";
import { useRouter } from "next/navigation";

export default function Page() {
 const router = useRouter();

 const [gender, setGender] = useState<string>("Male");
 const [weight, setWeight] = useState<number>(0);
 const [age, setAge] = useState<number>(0);
 const [activity, setActivity] = useState("Active");

 const handleGenderChange = (e: any) => setGender(e.target.value);
 const handleWeightChange = (e: any) => setWeight(parseInt(e.target.value));
 const handleAgeChange = (e: any) => setAge(parseInt(e.target.value));
 const handleActivityChange = (e: any) => setActivity(e.target.value);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [hasError, setHasError] = useState<boolean>(false);

 function handleCompleteOnboarding() {
   setIsLoading(true);
   if (weight <= 200 && age < 100) {
     completeOnboarding(gender, Number(weight), Number(age), activity)
     .then(() => {
       router.push("/dashboard");
     });
   }
   else {
     setIsLoading(false);
     setHasError(true);
   }
 }

 return (
   <>
     <Container>
       <h1 className="text-4xl font-bold text-black font-sans block text-center mt-[10vh]">
         Complete onboarding
       </h1>
       <p className="text-center mt-3 mb-10">
         Help us get to know you better by filling up these additional details
       </p>


       <form
         className="mx-auto max-w-lg"
         onSubmit={(e) => {
           e.preventDefault();
           handleCompleteOnboarding();
         }}
       >
         <label htmlFor="gender" className="block">
           Gender
         </label>
         <select
           className="select select-bordered w-full max-w-lg focus:outline-black block mb-5 rounded-md bg-gray-50"
           name="gender"
           value={gender}
           onChange={handleGenderChange}
           required
         >
           <option value="Male">Male</option>
           <option value="Female">Female</option>
         </select>


         <label htmlFor="weight" className="block">
           Weight (in Kg)
         </label>
         <input
           type="number"
           className="input input-bordered w-full mb-5 rounded-md bg-gray-50"
           value={weight}
           onChange={handleWeightChange}
           required
         />


         <label htmlFor="age" className="block">
           Age
         </label>
         <input
           type="number"
           className="input input-bordered w-full mb-5 rounded-md bg-gray-50"
           value={age}
           onChange={handleAgeChange}
           required
         />


         <label htmlFor="active" className="block">
           How active are you
         </label>
         <select
           className="select select-bordered w-full max-w-lg focus:outline-black block mb-5 rounded-md bg-gray-50"
           name="active"
           value={activity}
           onChange={handleActivityChange}
           required
         >
           <option value="Active">Active - (routine daily exercises)</option>
           <option value="NoRarely active">Rarely active (max 3 times exercise per week)</option>
           <option value="Not active">Little to zero exercise per week</option>
         </select>


         <button
           type="submit"
           className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
           disabled={isLoading}
         >
           {isLoading ? "Saving details..." :  "Save my details"}
         </button>


         {hasError && <p className="text-red-600 mt-2">Weight or age is invalid</p>}


       </form>
     </Container>
   </>
 );
}

