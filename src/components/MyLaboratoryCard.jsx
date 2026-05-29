import { Info } from "lucide-react";

function MyLaboratoryCard({
  lab,
  openLabId,
  setOpenLabId,
  getComputerByLab,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {lab.name}
          </h2>
          <div className="flex justify-between">
            <p className="text-gray-500">
              Location:
            </p>
            <p className="font-medium">
            {lab.location}
          </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-500">
              Computers
            </p>

            <p className="font-medium">
              {lab.computerCount}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t flex justify-end">
          <button
            onClick={async () => {
              if (openLabId === lab._id) {
                setOpenLabId(null);
                return;
              }

              setOpenLabId(lab._id);
              await getComputerByLab(lab._id);
            }}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyLaboratoryCard;