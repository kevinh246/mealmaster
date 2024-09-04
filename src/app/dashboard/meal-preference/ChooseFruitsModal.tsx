"use client";


import { useRef, useState } from "react";


export default function ChooseFruitsModal(
   {
       openFruitModal,
       setOpenFruitModal,
   }
   :
   {
       openFruitModal: boolean,
       setOpenFruitModal: (open: boolean) => void,
   }
) {


 // Reference of the fruits dialog box
 const fruitsModalRef = useRef<HTMLDialogElement>(null);


 // States for each fruits
 const [apple, setApple] = useState<boolean>(false);
 const [orange, setOrange] = useState<boolean>(false);
 const [pineapple, setPineapple] = useState<boolean>(false);
 const [grape, setGrape] = useState<boolean>(false);
 const [kiwi, setKiwi] = useState<boolean>(false);
 const [durian, setDurian] = useState<boolean>(false);
 const [strawberry, setStrawberry] = useState<boolean>(false);
 const [pear, setPear] = useState<boolean>(false);
 const [banana, setBanana] = useState<boolean>(false);
 const [mango, setMango] = useState<boolean>(false);


 // Array to store the selected fruits
 const [selectedFruits, setSelectedFruits] = useState<string[]>([]);


 // Handle change functions for each fruits
 const handleFruitsChange = (
   setter: React.Dispatch<React.SetStateAction<boolean>>,
   fruitName: string,
   isChecked: boolean
 ) => {
   setter(isChecked);
   setSelectedFruits(prev =>
     isChecked ? [...prev, fruitName] : prev.filter(f => f !== fruitName)
   );
 };


 // Save the chosen fruits preference in Local Storage
 const saveFruitsPreference = () => {
   localStorage.setItem("fruitsPreference", JSON.stringify(selectedFruits));
 };


 // Toggle the open and close state of the modal depending on the value
 // of the openFruitsModal
 if (openFruitModal) {
   fruitsModalRef?.current?.showModal();
 }
 else {
   fruitsModalRef?.current?.close();
 }


 return (
   <dialog id="fruit_modal" className="modal" ref={fruitsModalRef}>
     <div className="modal-box rounded-md">
       <h3 className="font-medium text-2xl text-center">
         Select fruit types
       </h3>
       <p className="mt-2 text-sm text-center text-gray-500">
         You can select one or more from the following options
       </p>
       <div className="px-10 mt-5">
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={apple}
             onChange={(e) =>
               handleFruitsChange(
                 setApple,
                 "Apple",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Apple</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={orange}
             onChange={(e) =>
               handleFruitsChange(
                 setOrange,
                 "Orange",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Orange</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={pineapple}
             onChange={(e) =>
               handleFruitsChange(
                 setPineapple,
                 "Pineapple",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Pineapple</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={grape}
             onChange={(e) =>
               handleFruitsChange(
                 setGrape,
                 "Grape",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Grape</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={kiwi}
             onChange={(e) =>
               handleFruitsChange(
                 setKiwi,
                 "Kiwi",
                 e.target.checked
               )
             }
           />
           <span className="ms-3">Kiwi</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={durian}
             onChange={(e) =>
               handleFruitsChange(
                   setDurian,
                   "Durian",
                   e.target.checked
               )
             }
           />
           <span className="ms-3">Durian</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={strawberry}
             onChange={(e) =>
               handleFruitsChange(
                   setStrawberry,
                   "Strawberry",
                   e.target.checked
               )
             }
           />
           <span className="ms-3">Strawberry</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={pear}
             onChange={(e) =>
               handleFruitsChange(
                   setPear,
                   "Pear",
                   e.target.checked
               )
             }
           />
           <span className="ms-3">Pear</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={banana}
             onChange={(e) =>
               handleFruitsChange(
                   setBanana,
                   "Banana",
                   e.target.checked
               )
             }
           />
           <span className="ms-3">Banana</span>
         </div>
         <div className="flex mb-5">
           <input
             type="checkbox"
             className="checkbox rounded-md"
             checked={mango}
             onChange={(e) =>
               handleFruitsChange(
                   setMango,
                   "Mango",
                   e.target.checked
               )
             }
           />
           <span className="ms-3">Mango</span>
         </div>
       </div>
       <div className="mt-5">
         <p className="text-sm text-center text-gray-500">
           You have selected {selectedFruits.length}{" "}
           {selectedFruits.length > 1 ? "items" : "item"}
         </p>
         <button
           className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
           onClick={() => {
               setOpenFruitModal(false);
               saveFruitsPreference();
           }}
         >
           Save selection
         </button>
       </div>
     </div>
   </dialog>
 );
}



