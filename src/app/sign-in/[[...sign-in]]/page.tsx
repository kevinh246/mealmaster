import CenterContainer from "@/components/CenterContainer";
import { SignIn } from "@clerk/nextjs";

export default function Signin() {
 return (
   <CenterContainer>
     <SignIn
       appearance={{
         elements: {
           cardBox: "shadow-none border shadow-lg",
           socialButtonsBlockButton: "py-3",
         },
       }}
     />
   </CenterContainer>
 );
}