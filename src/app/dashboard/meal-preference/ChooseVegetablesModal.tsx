"use client";


import { useRef, useState } from "react";


export default function ChooseVegetablesModal(
   {
       openVegetablesModal,
       setOpenVegetablesModal,
   }
   :
   {
       openVegetablesModal: boolean,
       setOpenVegetablesModal: (open: boolean) => void,
   }
) {


 // Reference of the vegetables dialog box
 const vegetablesModalRef = useRef<HTMLDialogElement>(null);


 // States for each vegetable
 const [chineseCabbage, setChineseCabbage] = useState<boolean>(false);
 const [chineseSpinach, setChineseSpinach] = useState<boolean>(false);
 const [waterSpinach, setWaterSpinach] = useState<boolean>(false);
 const [beanSprouts, setBeanSprouts] = useState<boolean>(false);
 const [longBeans, setLongBeans] = useState<boolean>(false);
 const [cucumber, setCucumber] = useState<boolean>(false);
 const [lettuce, setLettuce] = useState<boolean>(false);
 const [broccoli, setBroccoli] = useState<boolean>(false);
 const [cauliflower, setCauliflower] = useState<boolean>(false);
 const [garlic, setGarlic] = useState<boolean>(false);


 // Array to store the selected vegetables
 const [selectedVegetables, setSelectedVegetables] = useState<string[]>([]);


 // Handle change functions for each vegetables
 const handleVegetableChange = (
   setter: React.Dispatch<React.SetStateAction<boolean>>,
   vegetableName: string,
   isChecked: boolean
 ) => {
   setter(isChecked);
   setSelectedVegetables(prev =>
     isChecked ? [...prev, vegetableName] : prev.filter(veg => veg !== vegetableName)
   );
 };


 // Save the chosen vegetables preference in Local Storage
 const saveVegetablesPreference = () => {
   localStorage.setItem("vegetablesPreference", JSON.stringify(selectedVegetables));
 };


 // Toggle the open and close state of the modal depending on the value
 // of the openVegetablesModal
 if (openVegetablesModal) {
   vegetablesModalRef?.current?.showModal();
 }
 else {
   vegetablesModalRef?.current?.close();
 }


 return (
   <dialog id="vegetables_modal" className="modal" ref={vegetablesModalRef}>
     <div className="modal-box rounded-md">
       <h3 className="font-medium text-2xl text-center">
         Select vegetables types
       </h3>
       <p className="mt-2 text-sm text-center text-gray-500">
         You can select one or more from the following options
       </p>
       <div className="px-10 mt-5">
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={chineseCabbage}
             onChange={(e) =>
               handleVegetableChange(
                 setChineseCabbage,
                 "Chinese cabbage",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Chinese cabbage</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={chineseSpinach}
             onChange={(e) =>
               handleVegetableChange(
                 setChineseSpinach,
                 "Chinese spinach",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Chinese spinach</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={waterSpinach}
             onChange={(e) =>
               handleVegetableChange(
                 setWaterSpinach,
                 "Water spinach",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Water spinach</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={beanSprouts}
             onChange={(e) =>
               handleVegetableChange(
                 setBeanSprouts,
                 "Bean sprouts",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Bean sprouts</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={longBeans}
             onChange={(e) =>
               handleVegetableChange(
                 setLongBeans,
                 "Long beans",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Long beans</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={cucumber}
             onChange={(e) =>
               handleVegetableChange(setCucumber, "Cucumber", e.target.checked)
             }
           />
           <span className="ms-3">Cucumber</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={lettuce}
             onChange={(e) =>
               handleVegetableChange(setLettuce, "Lettuce", e.target.checked)
             }
           />
           <span className="ms-3">Lettuce</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={broccoli}
             onChange={(e) =>
               handleVegetableChange(setBroccoli, "Broccoli", e.target.checked)
             }
           />
           <span className="ms-3">Broccoli</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={cauliflower}
             onChange={(e) =>
               handleVegetableChange(
                 setCauliflower,
                 "Cauliflower",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Cauliflower</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={garlic}
             onChange={(e) =>
               handleVegetableChange(setGarlic, "Garlic", e.target.checked)
             }
           />
           <span className="ms-3">Garlic</span>
         </div>
       </div>
       <div className="mt-5">
         <p className="text-sm text-center text-gray-500">
           You have selected {selectedVegetables.length}{" "}
           {selectedVegetables.length > 1 ? "items" : "item"}
         </p>
         <button
           className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
           onClick={() => {
               setOpenVegetablesModal(false);
               saveVegetablesPreference();
           }}
         >
           Save selection
         </button>
       </div>
     </div>
   </dialog>
 );
}