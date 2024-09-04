"use client";


import { useRef, useState } from "react";


export default function ChooseGrainsModal(
   {
       openGrainModal,
       setOpenGrainModal,
   }
   :
   {
       openGrainModal: boolean,
       setOpenGrainModal: (open: boolean) => void,
   }
) {


 // Reference of the grains dialog box
 const grainModalRef = useRef<HTMLDialogElement>(null);


 // States for each grains
 const [rice, setRice] = useState<boolean>(false);
 const [noodles, setNoodles] = useState<boolean>(false);
 const [bread, setBread] = useState<boolean>(false);
 const [quinoa, setQuinoa] = useState<boolean>(false);
 const [oats, setOats] = useState<boolean>(false);
 const [barley, setBarley] = useState<boolean>(false);
 const [corn, setCorn] = useState<boolean>(false);
 const [soyMilk, setSoyMilk] = useState<boolean>(false);
 const [oatMilk, setOatMilk] = useState<boolean>(false);


 // Array to store the selected grains
 const [selectedGrains, setSelectedGrains] = useState<string[]>([]);


 // Handle change functions for each grains
 const handleGrainsChange = (
   setter: React.Dispatch<React.SetStateAction<boolean>>,
   grains: string,
   isChecked: boolean
 ) => {
   setter(isChecked);
   setSelectedGrains(prev =>
     isChecked ? [...prev, grains] : prev.filter(m => m !== grains)
   );
 };


 // Save the chosen grains preference in Local Storage
 const saveGrainsPreference = () => {
   localStorage.setItem("grainsPreference", JSON.stringify(selectedGrains));
 };


 // Toggle the open and close state of the modal depending on the value
 // of the openGrainsModal
 if (openGrainModal) {
   grainModalRef?.current?.showModal();
 }
 else {
   grainModalRef?.current?.close();
 }


 return (
   <dialog id="grain_modal" className="modal" ref={grainModalRef}>
     <div className="modal-box rounded-md">
       <h3 className="font-medium text-2xl text-center">
         Select grain types
       </h3>
       <p className="mt-2 text-sm text-center text-gray-500">
         You can select one or more from the following options
       </p>
       <div className="px-10 mt-5">
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={rice}
             onChange={(e) =>
               handleGrainsChange(
                 setRice,
                 "Rice (jasmine rice, basmati rice, brown rice)",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Rice (jasmine rice, basmati rice, brown rice)</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={noodles}
             onChange={(e) =>
               handleGrainsChange(
                 setNoodles,
                 "Noodles (rice noodles, wheat noodles)",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Noodles (rice noodles, wheat noodles)</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={bread}
             onChange={(e) =>
               handleGrainsChange(
                 setBread,
                 "Bread (white bread, wholemeal bread)",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Bread (white bread, wholemeal bread)</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={quinoa}
             onChange={(e) =>
               handleGrainsChange(
                 setQuinoa,
                 "Quinoa",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Quinoa</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={oats}
             onChange={(e) =>
               handleGrainsChange(
                 setOats,
                 "Oats",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Oats</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={barley}
             onChange={(e) =>
               handleGrainsChange(
                 setBarley,
                 "Barley",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Barley</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={corn}
             onChange={(e) =>
               handleGrainsChange(
                 setCorn,
                 "Corn",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Corn</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={soyMilk}
             onChange={(e) =>
               handleGrainsChange(
                 setSoyMilk,
                 "Soy milk",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Soy milk</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={oatMilk}
             onChange={(e) =>
               handleGrainsChange(
                 setOatMilk,
                 "Oat milk",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Oat milk</span>
         </div>
       </div>
       <div className="mt-5">
         <p className="text-sm text-center text-gray-500">
           You have selected {selectedGrains.length}{" "}
           {selectedGrains.length > 1 ? "items" : "item"}
         </p>
         <button
           className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
           onClick={() => {
               setOpenGrainModal(false);
               saveGrainsPreference();
           }}
         >
           Save selection
         </button>
       </div>
     </div>
   </dialog>
 );
}

