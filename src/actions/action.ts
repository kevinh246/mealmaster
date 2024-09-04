"use server";

import { User, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
// import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function completeOnboarding(gender: string, weight: number, age: number, active: string) {
   try {
       const user: User | null = await currentUser();

       if (user?.id) {
           await prisma.userAccount.update({
               where: {
                   id: user.id,
               },
               data: { gender, weight, age, active, onboardingCompleted: true },
           });
       }
       else {
           throw new Error("Error: user id is invalid");
       }

       const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calorie`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({
               prompt: `${gender}, ${age} years old, ${weight}kg, ${active}`
           }),
       });

       if (!response.ok) {
           throw new Error("eailed to fetch recommended calorie intake.");
       }

       const recommendedCalorieIntake = await response.json();
       const calorieIntake = JSON.parse(recommendedCalorieIntake.message).recommendedCalorieIntake;

       // Update the user's recommended calorie intake in the database
       await prisma.userAccount.update({
           where: {
               id: user.id,
           },
           data: {
               recommendedCalorieIntake: calorieIntake
           },
       });

       // DO NOT do this as it will trigger a NEXT_REDIRECT error
       // redirect("/dashboard");
   }
   catch (error: any) {
       console.error("Error completing onboarding: ", error);
   }
   finally {
       // Disconnect from Prisma client
       await prisma.$disconnect();
   }
}

export async function saveMealPreferenceGroup(
    vegetablesPreference: any, 
    dairyPreference: any,
    meatPreference: any,
    grainsPreference: any,
    fruitsPreference: any,
    seafoodPreference: any,
) {
    const user: User | null = await currentUser();

    await prisma.userAccount.update({
        where: {
            id: user?.id,
        },
        data: {
            vegetablesPreference: vegetablesPreference,
            dairyPreference: dairyPreference,
            meatPreference: meatPreference,
            grainsPreference: grainsPreference,
            fruitsPreference: fruitsPreference,
            seafoodPreference: seafoodPreference,

        },
    });
}

export async function incrementNoOfMealPlanGenerated() {
    const user: User | null = await currentUser();

    await prisma.userAccount.update({
        where: {
            id: user?.id,
        },
        data: {
            // Increment the field generationLimit = current generationLimit + 1
        },
    });
}