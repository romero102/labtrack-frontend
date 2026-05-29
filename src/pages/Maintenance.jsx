import { Search, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { Info } from "lucide-react";
import DetailMaintenance from "../components/DetailMaintenance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaintenanceCard from "../components/MaintenanceCard";

function Maintenance() {
  const {
    maintenance,
    getAllMaintenance,
    deleteMaintenance,
    loadingMaintenance,
  } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [computerSearch, setComputerSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getAllMaintenance();
  }, []);

  if (loadingMaintenance) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (maintenance.length === 0) {
    return (
      <div className="mb-6 flex justify-between">
        <h1>No Maintenance</h1>
      </div>
    );
  }

  const handleConfirmDelete = async () => {
    setModalOpen(false);

    const promise = deleteMaintenance(selectedMaintenance._id);

    toast.promise(promise, {
      loading: "Deleting maintenance...",
      success: "Maintenance deleted",
      error: "Something went wrong",
    });
  };

  const filteredMaintenance = maintenance
    .filter((maintenanc) => {
      const computerMatch = maintenanc.computer?.code
        ?.toLowerCase()
        .includes(computerSearch.toLowerCase());

      const userMatch = maintenanc.technician?.name
        ?.toLowerCase()
        .includes(userSearch.toLowerCase());

      let dateMatch = true;

      if (selectedDate) {
        const maintenanceDate = new Date(maintenanc.createdAt);

        dateMatch =
          maintenanceDate.toDateString() === selectedDate.toDateString();
      }

      return computerMatch && userMatch && dateMatch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Maintenace</h1>
      </div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <form className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Find by computer..."
            value={computerSearch}
            onChange={(e) => setComputerSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
        <form className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Find by user..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
        <form className="relative w-full md:max-w-md">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Find by date..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Computer</th>
              <th className="px-6 py-3">Technician</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Nature</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Findings</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Detail</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {filteredMaintenance.map((maintenance) => (
              <tr
                key={maintenance._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{maintenance.computer?.code}</td>
                <td className="px-6 py-4">{maintenance.technician?.name}</td>
                <td className="px-6 py-4">{maintenance.category}</td>
                <td className="px-6 py-4">{maintenance.nature}</td>
                <td className="px-6 py-4">
                  {maintenance.description.slice(0, 8)}...
                </td>
                <td className="px-6 py-4">
                  {maintenance.findings.slice(0, 8)}...
                </td>
                <td className="px-6 py-4">{maintenance.status}</td>
                <td className="px-6 py-4">
                  {new Date(maintenance.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      className="text-amber-600 hover:text-amber-800 transition"
                      onClick={() => {
                        (setSelectedMaintenance(maintenance),
                          setOpenModalDetail(true));
                      }}
                    >
                      <Info />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards Mobile */}
      <div className="md:hidden space-y-4">
        {filteredMaintenance.map((maintenance) => (
          <MaintenanceCard
            key={maintenance._id}
            maintenance={maintenance}
            setSelectedMaintenance={setSelectedMaintenance}
            setModalOpen={setModalOpen}
            setOpenModalDetail={setOpenModalDetail}
          />
        ))}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this maintenance?"
      />
      {openModalDetail && selectedMaintenance && (
        <DetailMaintenance
          maintenance={selectedMaintenance}
          onClose={() => {
            setOpenModalDetail(false);
            setSelectedMaintenance(null);
          }}
        />
      )}
    </div>
  );
}

export default Maintenance;
