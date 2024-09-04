import React from "react"
import { UserProfile } from "@clerk/nextjs";
import CenterContainer from "@/components/CenterContainer";

export default function page() {
  return (
    <CenterContainer>
      <UserProfile/>
    </CenterContainer>
  )
}
