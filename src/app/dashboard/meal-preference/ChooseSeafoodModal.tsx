"use client";

import { useRef, useState } from "react";

export default function ChooseSeafoodModal({
  openSeafoodModal,
  setOpenSeafoodModal,
}: {
  openSeafoodModal: boolean;
  setOpenSeafoodModal: (open: boolean) => void;
}) {
  // Reference of the seafood dialog box
  const seafoodModalRef = useRef<HTMLDialogElement>(null);

  // States for each seafood
  const [prawn, setPrawn] = useState<boolean>(false);
  const [scallop, setScallop] = useState<boolean>(false);
  const [crab, setCrab] = useState<boolean>(false);
  const [clams, setClams] = useState<boolean>(false);
  const [fish, setFish] = useState<boolean>(false);
  const [lobster, setLobster] = useState<boolean>(false);
  const [squid, setSquid] = useState<boolean>(false);
  const [octopus, setOctopus] = useState<boolean>(false);
  const [oyster, setOyster] = useState<boolean>(false);
  const [seafoodNotApplicable, setSeafoodNotApplicable] =
    useState<boolean>(false);
  // Array to store the selected seafood
  const [selectedSeafood, setSelectedSeafood] = useState<string[]>([]);

  // Handle change functions for each seafood
  const handleseafoodChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    seafoodName: string,
    isChecked: boolean
  ) => {
    setter(isChecked);
    setSelectedSeafood((prev) =>
      isChecked ? [...prev, seafoodName] : prev.filter((s) => s !== seafoodName)
    );
  };

  // Save the chosen seafood preference in Local Storage
  const savesSeafoodPreference = () => {
    localStorage.setItem("seafoodPreference", JSON.stringify(selectedSeafood));
  };

  // Toggle the open and close state of the modal depending on the value
  // of the openSeafoodModal
  if (openSeafoodModal) {
    seafoodModalRef?.current?.showModal();
  } else {
    seafoodModalRef?.current?.close();
  }

  return (
    <dialog id="seafood_modal" className="modal" ref={seafoodModalRef}>
      <div className="modal-box rounded-md">
        <h3 className="font-medium text-2xl text-center">
          Select seafood types
        </h3>
        <p className="mt-2 text-sm text-center text-gray-500">
          You can select one or more from the following options
        </p>
        <div className="px-10 mt-5">
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={prawn}
              onChange={(e) =>
                handleseafoodChange(setPrawn, "Prawn", e.target.checked)
              }
            />
            <span className="ms-3">Prawn</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={scallop}
              onChange={(e) =>
                handleseafoodChange(setScallop, "Scallop", e.target.checked)
              }
            />
            <span className="ms-3">Scallop</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={crab}
              onChange={(e) =>
                handleseafoodChange(setCrab, "Crab", e.target.checked)
              }
            />
            <span className="ms-3">Crab</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={clams}
              onChange={(e) =>
                handleseafoodChange(setClams, "Clams", e.target.checked)
              }
            />
            <span className="ms-3">Clams</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={fish}
              onChange={(e) =>
                handleseafoodChange(setFish, "Fish", e.target.checked)
              }
            />
            <span className="ms-3">Fish</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={lobster}
              onChange={(e) =>
                handleseafoodChange(setLobster, "Lobster", e.target.checked)
              }
            />
            <span className="ms-3">Lobster</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={squid}
              onChange={(e) =>
                handleseafoodChange(setSquid, "Squid", e.target.checked)
              }
            />
            <span className="ms-3">Squid</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={octopus}
              onChange={(e) =>
                handleseafoodChange(setOctopus, "Octopus", e.target.checked)
              }
            />
            <span className="ms-3">Octopus</span>
          </div>
          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={oyster}
              onChange={(e) =>
                handleseafoodChange(setOyster, "Oyster", e.target.checked)
              }
            />
            <span className="ms-3">Oyster</span>
          </div>

          <div className="flex mb-5">
            <input
              type="checkbox"
              className="checkbox rounded-md"
              checked={seafoodNotApplicable}
              onChange={(e) =>
                handleseafoodChange(
                  setSeafoodNotApplicable,
                  "Seafood not applicable",
                  e.target.checked
                )
              }
            />
            <span className="ms-3">N.A</span>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm text-center text-gray-500">
            You have selected {selectedSeafood.length}{" "}
            {selectedSeafood.length > 1 ? "items" : "item"}
          </p>
          <button
            className="btn bg-[#59a2f7] hover:bg-[#59a2f7] text-white border-none mt-3 px-20 rounded-full w-full"
            onClick={() => {
              setOpenSeafoodModal(false);
              savesSeafoodPreference();
            }}
          >
            Save selection
          </button>
        </div>
      </div>
    </dialog>
  );
}
