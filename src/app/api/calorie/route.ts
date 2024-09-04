import { NextResponse } from "next/server";
import OpenAI from "openai";

// Instance of OpenAI API client
const openai = new OpenAI({
   apiKey: process.env.OPEN_AI_API_KEY,
});

export const runtime = "edge";

export async function POST(request: Request) {
   try {
       const body = await request.json();
      
       // Extract prompt
       const { prompt } = body;

       // Handle error if prompt is present and not empty
       if (prompt && prompt.trim() !== "") {
           const chatResponse = await openai.chat.completions.create({
               model: "gpt-4o",
               messages: [
                   {
                       role: "system",
                       content:
                       `
                       Act as a helpful nutritionist assistant, a recommended calorie intake for the following user profile:
                       ${prompt}
                       Return the data as a JSON ONLY with the following format:
                       {
                           "recommendedCalorieIntake" : <calorie intake>
                       }
                       Remember to generate with the format requested above. DO NOT include any other response or data.
                       `
                   }
               ]
           });

           // Extract the content from the response
           const content = chatResponse.choices[0].message.content;

           return NextResponse.json({ message: content }, { status: 200 });
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