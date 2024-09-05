import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";


// Instance of OpenAI API client
const openai = new OpenAI({
   apiKey: process.env.OPEN_AI_API_KEY,
});


// Runtime edge will clash with Prisma, hence remove it
// export const runtime = "edge";

const prisma = new PrismaClient();

export async function POST(request: Request) {
   try {
       const body = await request.json();
      
       // Extract prompt
       const { prompt } = body;

       // Handle error if prompt is present and not empty
       if (prompt && prompt.trim() !== "") {
           // console.log(prompt);
          
           const user = await currentUser();

           // Retrieve the recommendedCalorieIntake for the currently logged in user
           let recommendedCalorieIntake = await prisma.userAccount.findUnique({
               where: {
                   id: user?.id,
               },
               select: {
                   recommendedCalorieIntake: true,
               },
           });
          
           const chatResponse = await openai.chat.completions.create({
               model: "gpt-4o",
               messages: [
                   {
                       role: "system",
                       content:
                       `
                       Act as a helpful nutritionist assistant, generate a meal plan for 7 days (Monday to Sunday).
                       When generating a meal plan, note of the following food preferences:
                       ${prompt}.
                       Also, the total calorie of meal generated per day should not exists ${recommendedCalorieIntake?.recommendedCalorieIntake} calorie.
                       When generating meal plans, DO NOT use main ingredients outside the specified food preference.
                       You can add supporting cooking ingredients such as: Salt, Pepper, Oil, etc....


                       Return the data as an array of JSON objects ONLY with the following format:


                       [
                           {
                               "day": "Monday",
                               "breakfast": <meal>,
                               "lunch": <meal>,
                               "dinner": <meal>
                           },
                           {
                               "day": "Tuesday",
                               "breakfast": <meal>,
                               "lunch": <meal>,
                               "dinner": <meal>
                           },
                           // Rest of the days till Sunday
                       ]
                       Remember to generate from Monday to Sunday with the format requested above and DO NOT include any other response or data.
                       `
                   }
               ]
           });


           // Extract the content from the response
           const content = chatResponse.choices[0].message.content;
           return NextResponse.json({ content }, { status: 200 });      
       }
       // Handle error if prompt is present but empty
       else {
           return NextResponse.json({ error: "Invalid prompt" }, { status: 422 });
       }
   }
   // Handle error if prompt is not present on request body
   catch (error) {
       // console.error(error);
       return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
   }
}



