"use client";

import { useRef, useState } from "react";

export default function ChooseMeatsModal({
  openMeatModal,
  setOpenMeatModal,
  onSelectionChange, // Accept the callback as a prop
}: {
  openMeatModal: boolean;
  setOpenMeatModal: (open: boolean) => void;
  onSelectionChange: (selected: string[]) => void; // Define the callback type
}) {
  // Reference of the meat dialog box
  const meatModalRef = useRef<HTMLDialogElement>(null);

  // States for each meat
  const [chicken, setChicken] = useState<boolean>(false);
  const [pork, setPork] = useState<boolean>(false);
  const [beef, setBeef] = useState<boolean>(false);
  const [lamb, setLamb] = useState<boolean>(false);

  // Array to store the selected meat
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);

  // Handle change functions for each meat
  const handleMeatChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    meatName: string,
    isChecked: boolean
  ) => {
    setter(isChecked);
    const updatedSelection = isChecked
      ? [...selectedMeats, meatName]
      : selectedMeats.filter((m) => m !== meatName);
    setSelectedMeats(updatedSelection);
    onSelectionChange(updatedSelection); // Call the callback with updated selection
  };

  // Save the chosen meat preference in Local Storage
  const saveMeatPreference = () => {
    localStorage.setItem("meatPreference", JSON.stringify(selectedMeats));
  };

  // Toggle the open and close state of the modal depending on the value
  // of the openMeatModal
  if (openMeatModal) {
    meatModalRef?.current?.showModal();
  } else {
    meatModalRef?.current?.close();
  }

  return (
    <dialog id="meat_modal" className="modal" ref={meatModalRef}>
      <div className="modal-box rounded-md">
        <h3 className="font-medium text-2xl text-center">Select meat types</h3>
        <p className="mt-2 text-sm text-center text-gray-500">
          You can select one or more from the following options
        </p>
        <div className="px-10 mt-5">
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={chicken}
              onChange={(e) =>
                handleMeatChange(setChicken, "Chicken", e.target.checked)
              }
            />
            <span className="ms-3">Chicken</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={pork}
              onChange={(e) =>
                handleMeatChange(setPork, "Pork", e.target.checked)
              }
            />
            <span className="ms-3">Pork</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={beef}
              onChange={(e) =>
                handleMeatChange(setBeef, "Beef", e.target.checked)
              }
            />
            <span className="ms-3">Beef</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={lamb}
              onChange={(e) =>
                handleMeatChange(setLamb, "Lamb", e.target.checked)
              }
            />
            <span className="ms-3">Lamb</span>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm text-center text-gray-500">
            You have selected {selectedMeats.length}{" "}
            {selectedMeats.length > 1 ? "items" : "item"}
          </p>
          <button
            className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
            onClick={() => {
              setOpenMeatModal(false);
              saveMeatPreference();
            }}
          >
            Save selection
          </button>
        </div>
      </div>
    </dialog>
  );
}
