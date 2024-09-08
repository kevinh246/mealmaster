"use client";

import Container from '@/components/Container'
import React from 'react'

export default function page() {
  return (
    <Container>
        <h1 className="text-4xl font-bold text-black font-sans block text-center mt-[10vh]">
          Exercise recommendation
        </h1>
        <p className="text-center mt-3 mb-10">
          We think it's good to get moving, check this out !
        </p>

        <div className="mt-10 border overflow-auto bg-gray-50 rounded-lg">
            <img src="/assets/imgs/bodyweight.png" className="float-start" width={150} alt="" />
            <h2 className="font-bold text-2xl mt-5">Bodyweight Training</h2>
            <p>Bodyweight exercises for strength and toning</p>
            <a 
                href="https://www.youtube.com/watch?v=7GkMHPe_OXw&ab_channel=ToneandTighten"
                target="_blank"
                className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none px-7 rounded-full float-end me-5 mt-3"
            >
                View video
            </a>
        </div>

        <div className="mt-10 border overflow-auto bg-gray-50 rounded-lg">
            <img src="/assets/imgs/weightlift.png" className="float-start" width={150} alt="" />
            <h2 className="font-bold text-2xl mt-5">Weight lifting</h2>
            <p>Weight lift is a good way to get some sweats</p>
            <a 
                href="https://www.youtube.com/watch?v=BNsKEG3hIzI&ab_channel=WhatsUpDude"
                target="_blank"
                className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none px-7 rounded-full float-end me-5 mt-3"
            >
                View video
            </a>
        </div>

        <div className="mt-10 border overflow-auto bg-gray-50 rounded-lg">
            <img src="/assets/imgs/bodyweight.png" className="float-start" width={150} alt="" />
            <h2 className="font-bold text-2xl mt-5">Quick jog</h2>
            <p>Get some extra steps with quick jogs</p>
            <a 
                href="https://www.youtube.com/watch?v=DVfRPMY4wHU&ab_channel=BenParkes"
                target="_blank"
                className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none px-7 rounded-full float-end me-5 mt-3"
            >
                View video
            </a>
        </div>
    </Container>
  )
}
