import Container from "@/components/Container";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const prisma = new PrismaClient();

  const userAccount = await prisma.userAccount.findUnique({
    where: {
      id: user?.id,
    },
  });

  // If user account does not exists, create it
  if (!userAccount) {
    await prisma.userAccount.create({
      data: {
        id: user?.id,
        email: String(user?.primaryEmailAddress?.emailAddress),
        fullname: user?.fullName!,
        onboardingCompleted: false,

        gender: "",
        weight: 0,
        age: 0,
        active: "",

        mealPreferenceSetupCompleted: false,

        vegetablesPreference: "",
        dairyPreference: "",
        meatPreference: "",
        grainsPreference: "",
        fruitsPreference: "",
        seafoodPreference: "",
        hasGenerated: false,

        generationLimit: 0,
      },
    });
    redirect("/dashboard");
  }

  // If user account exists
  else {
    // Check if onboarding hasn't been completed
    if (!userAccount.onboardingCompleted) {
      // Send the to the onboarding page
      redirect("/dashboard/onboarding");
    }

    // Check if meal preference setup hasn't been completed
    if (!userAccount.mealPreferenceSetupCompleted) {
      // Send the to the meal-preference page
      redirect("/dashboard/meal-preference");
    }
  }

  return (
    <Container>
      <h1 className="text-3xl font-san mt-10">Hello, {user?.firstName}</h1>
    </Container>
  );
}
