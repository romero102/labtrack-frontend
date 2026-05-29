import { Link } from "react-router-dom";
import { SquarePen, Trash2 } from "lucide-react";

function LaboratoryCard({ lab, setSelectedLab, setModalOpen }) {
  return (
    <div className="rounded-xl shadow-md p-4 space-y-3 border border-gray-100">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-lg font-bold text-gray-800">{lab.name}</h2>
        </div>

        <div className="flex gap-3 items-center justify-end">
          <Link
            to={`/laboratoryform/${lab._id}`}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <SquarePen className="w-5 h-5" />
          </Link>

          <button
            className="text-red-600 hover:text-red-800 transition"
            onClick={() => {
              setSelectedLab(lab);
              setModalOpen(true);
            }}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex justify-between">
            <p className="text-sm text-gray-500">Location</p>

            <p className="font-semibold text-gray-800">{lab.location}</p>
          </div>

      <div className="flex justify-between pt-2 border-t border-gray-100">
        <p className="text-sm text-gray-500">Number of computers</p>

        <p className="font-semibold text-gray-800">{lab.computerCount}</p>
      </div>
    </div>
  );
}

export default LaboratoryCard;
