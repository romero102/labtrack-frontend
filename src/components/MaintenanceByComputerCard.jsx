import { Link } from "react-router-dom";
import { SquarePen, Trash2, Info } from "lucide-react";

function MaintenanceByComputerCard({
  maintenance,
  user,
  setSelectedMaintenance,
  setModalOpen,
  setOpenModalDetail,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">
          {maintenance.computer?.code}
        </h3>

        <span className="text-sm text-gray-500">
          {new Date(maintenance.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Technician</p>
          <p>{maintenance.technician?.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Category</p>
          <p>{maintenance.category}</p>
        </div>

        <div>
          <p className="text-gray-500">Nature</p>
          <p>{maintenance.nature}</p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <p>{maintenance.status}</p>
        </div>
        <div>
        <p className="text-gray-500 text-sm">Description</p>
        <p className="text-sm">
          {maintenance.description.slice(0, 100)}
          {maintenance.description.length > 100 && "..."}
        </p>
      </div>

      <div>
        <p className="text-gray-500 text-sm">Findings</p>
        <p className="text-sm">
          {maintenance.findings.slice(0, 100)}
          {maintenance.findings.length > 100 && "..."}
        </p>
      </div>
      </div>

      <div className="flex justify-end gap-4 pt-2 border-t">
        <button
          className="text-amber-600 hover:text-amber-800"
          onClick={() => {
            setSelectedMaintenance(maintenance);
            setOpenModalDetail(true);
          }}
        >
          <Info />
        </button>

        {(user.role === "admin" ||
          maintenance.technician?._id === user.id) && (
          <>
            <Link
              to={`/maintenanceform/${maintenance._id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              <SquarePen />
            </Link>

            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => {
                setSelectedMaintenance(maintenance);
                setModalOpen(true);
              }}
            >
              <Trash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MaintenanceByComputerCard;