import { Info, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function MaintenanceCard({
  maintenance,
  setSelectedMaintenance,
  setModalOpen,
  setOpenModalDetail,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-4 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {maintenance.computer?.code}
          </h2>
          <p className="text-sm text-gray-500">
            {maintenance.technician?.name}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          {maintenance.status}
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Category</p>
          <p className="font-medium">{maintenance.category}</p>
        </div>

        <div>
          <p className="text-gray-500">Nature</p>
          <p className="font-medium">{maintenance.nature}</p>
        </div>

        <div>
          <p className="text-gray-500">Description</p>
          <p className="font-medium">
            {maintenance.description.slice(0, 20)}...
          </p>
        </div>

        <div>
          <p className="text-gray-500">Findings</p>
          <p className="font-medium">
            {maintenance.findings.slice(0, 20)}...
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500">Date</p>
          <p className="font-medium">
            {new Date(maintenance.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2 border-t">
        <button
          className="text-amber-600 hover:text-amber-800 transition"
          onClick={() => {
            setSelectedMaintenance(maintenance);
            setOpenModalDetail(true);
          }}
        >
          <Info className="w-5 h-5" />
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

export default MaintenanceCard;