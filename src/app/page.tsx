"use client";

import Link from "next/link";
import { ReactTyped } from "react-typed";

export default async function Home() {

  return (
    <div className="text-center mt-[20vh]">
      <h1 className="text-4xl font-bold font-sans block">
        Welcome to Mealmaster 🎉
      </h1>
      <p className="mt-3">
        <ReactTyped
          strings={["Get started on your journey towards a healthier meal"]}
          typeSpeed={70}
        />
      </p>
      <img 
        src="/assets/imgs/landing.png" 
        width={300}
        className="mx-auto"
        alt="Landing image" 
      />
      <Link 
        href="/dashboard"
        className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none font-medium mt-3 px-20 rounded-full"
      >
        Start my journey
      </Link>
    </div>
  );
}