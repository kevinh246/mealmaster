"use client";

import { useRef, useState } from "react";

export default function ChooseDairyModal({
  openDairyModal,
  setOpenDairyModal,
  onSelectionChange, // Accept the callback as a prop
}: {
  openDairyModal: boolean;
  setOpenDairyModal: (open: boolean) => void;
  onSelectionChange: (selected: string[]) => void; // Define the callback type
}) {
  // Reference of the dairy dialog box
  const dairyModalRef = useRef<HTMLDialogElement>(null);

  // States for each dairy
  const [freshMilk, setFreshMilk] = useState<boolean>(false);
  const [yoghurt, setYoghurt] = useState<boolean>(false);
  const [cheese, setCheese] = useState<boolean>(false);
  const [butter, setButter] = useState<boolean>(false);
  const [condensedMilk, setCondensedMilk] = useState<boolean>(false);
  const [evaporatedMilk, setEvaporatedMilk] = useState<boolean>(false);
  const [iceCream, setIceCream] = useState<boolean>(false);

  // Array to store the selected dairy
  const [selectedDairy, setSelectedDairy] = useState<string[]>([]);

  // Handle change functions for each dairy
  const handleDairyChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    dairyName: string,
    isChecked: boolean
  ) => {
    setter(isChecked);
    const updatedSelection = isChecked
      ? [...selectedDairy, dairyName]
      : selectedDairy.filter((d) => d !== dairyName);
    setSelectedDairy(updatedSelection);
    onSelectionChange(updatedSelection); // Call the callback with updated selection
  };

  // Save the chosen dairy preference in Local Storage
  const saveDairyPreference = () => {
    localStorage.setItem("dairyPreference", JSON.stringify(selectedDairy));
  };

  // Toggle the open and close state of the modal depending on the value
  // of the openDairyModal
  if (openDairyModal) {
    dairyModalRef?.current?.showModal();
  } else {
    dairyModalRef?.current?.close();
  }

  return (
    <dialog id="dairy_modal" className="modal" ref={dairyModalRef}>
      <div className="modal-box rounded-md">
        <h3 className="font-medium text-2xl text-center">Select dairy types</h3>
        <p className="mt-2 text-sm text-center text-gray-500">
          You can select one or more from the following options
        </p>
        <div className="px-10 mt-5">
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={freshMilk}
              onChange={(e) =>
                handleDairyChange(setFreshMilk, "Fresh milk", e.target.checked)
              }
            />
            <span className="ms-3">Fresh milk</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={yoghurt}
              onChange={(e) =>
                handleDairyChange(setYoghurt, "Yoghurt", e.target.checked)
              }
            />
            <span className="ms-3">Yoghurt</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={cheese}
              onChange={(e) =>
                handleDairyChange(setCheese, "Cheese", e.target.checked)
              }
            />
            <span className="ms-3">Cheese</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={butter}
              onChange={(e) =>
                handleDairyChange(setButter, "Butter", e.target.checked)
              }
            />
            <span className="ms-3">Butter</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={condensedMilk}
              onChange={(e) =>
                handleDairyChange(
                  setCondensedMilk,
                  "Condensed milk",
                  e.target.checked
                )
              }
            />
            <span className="ms-3">Condensed milk</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={evaporatedMilk}
              onChange={(e) =>
                handleDairyChange(
                  setEvaporatedMilk,
                  "Evaporated milk",
                  e.target.checked
                )
              }
            />
            <span className="ms-3">Evaporated milk</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={iceCream}
              onChange={(e) =>
                handleDairyChange(setIceCream, "Ice cream", e.target.checked)
              }
            />
            <span className="ms-3">Ice cream</span>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm text-center text-gray-500">
            You have selected {selectedDairy.length}{" "}
            {selectedDairy.length > 1 ? "items" : "item"}
          </p>
          <button
            className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
            onClick={() => {
              setOpenDairyModal(false);
              saveDairyPreference();
            }}
          >
            Save selection
          </button>
        </div>
      </div>
    </dialog>
  );
}
