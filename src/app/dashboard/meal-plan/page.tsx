import { currentUser } from "@clerk/nextjs/server";
import MealPlan from "./MealPlan";

export default async function Page() {
  const user = await currentUser();

  return (
    <>
      <MealPlan name={String(user?.fullName)} />
    </>
  );
}
