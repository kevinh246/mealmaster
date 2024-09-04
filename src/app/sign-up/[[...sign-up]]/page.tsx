import CenterContainer from "@/components/CenterContainer";
import { SignUp } from "@clerk/nextjs";


const UserProfilePage = () => (
 <CenterContainer>
   <SignUp
     appearance={{
       elements: {
         cardBox: "shadow-none border shadow-lg",
         socialButtonsBlockButton: "py-3",
       },
     }} 
   />
 </CenterContainer>
);

export default UserProfilePage;