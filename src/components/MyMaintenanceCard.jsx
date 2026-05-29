import { Info, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function MyMaintenanceCard({
  maintenance,
  setSelectedMaintenance,
  setOpenModalDetail,
  setModalOpen,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Computer</p>
          <p className="font-semibold text-gray-800">
            {maintenance.computer?.code}
          </p>
        </div>

        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
          {maintenance.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Technician</p>
          <p className="text-gray-700">{maintenance.technician?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-gray-700">{maintenance.category}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Nature</p>
          <p className="text-gray-700">{maintenance.nature}</p>
        </div>
      

      <div>
        <p className="text-sm text-gray-500">Description</p>
        <p className="text-gray-700 break-words">{maintenance.description}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Findings</p>
        <p className="text-gray-700 break-words">{maintenance.findings}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Date</p>
        <p className="text-gray-700">
          {new Date(maintenance.createdAt).toLocaleDateString()}
        </p>
      </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t">
        <button
          className="text-amber-600 hover:text-amber-800 transition"
          onClick={() => {
            setSelectedMaintenance(maintenance);
            setOpenModalDetail(true);
          }}
        >
          <Info />
        </button>

        <div className="flex gap-4">
          <Link
            to={`/maintenanceform/${maintenance._id}`}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <SquarePen className="w-5 h-5" />
          </Link>

          <button
            className="text-red-600 hover:text-red-800 transition"
            onClick={() => {
              setSelectedMaintenance(maintenance);
              setModalOpen(true);
            }}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyMaintenanceCard;
