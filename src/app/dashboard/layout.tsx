import Container from "@/components/Container"
import React from "react"
import { currentUser } from '@clerk/nextjs/server';
import Navbar from "@/components/Navbar";
export default async function DashboardLayout({ children } : { children: React.ReactNode }) {
  
  const user = await currentUser();

  return (
    <Container>
      <Navbar profileUrl={String(user?.imageUrl)}/>
      {children}
    </Container>
  )
}
