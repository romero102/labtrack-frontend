import { Search, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { Info } from "lucide-react";
import DetailMaintenance from "../components/DetailMaintenance";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaintenanceByComputerCard from "../components/MaintenanceByComputerCard";

function MaintenanceByComputer() {
  const {
    maintenance,
    getAllMaintenance,
    deleteMaintenance,
    user,
    loadingMaintenance,
  } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const params = useParams();

  useEffect(() => {
    getAllMaintenance();
  }, []);

  const filteredMaintenance = maintenance
    .filter((maintenanc) => {
      // filtro por computadora
      const computerMatch = maintenanc.computer?._id === params.id;

      // filtro por técnico
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

  const computerData = filteredMaintenance[0]?.computer;

  if (loadingMaintenance) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredMaintenance.length === 0)
    return (
      <div className="mb-6 flex justify-between">
        <h1>There is no maintenance for that computer.</h1>
        <Link
          to={`/maintenanceform?computerId=${computerData?._id}`}
          className="order-1 md:order-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition text-center"
        >
          Add maintenance
        </Link>
      </div>
    );

  const handleConfirmDelete = async () => {
    setModalOpen(false);

    const promise = deleteMaintenance(selectedMaintenance._id);

    toast.promise(promise, {
      loading: "Deleting maintenance...",
      success: "Maintenance deleted",
      error: "Something went wrong",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {computerData?.code}
        </h1>
      </div>
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">Laboratory:</p>
            <p className="font-medium">{computerData?.lab?.name}</p>
          </div>

          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">Processor:</p>
            <p className="font-medium">{computerData?.processor}</p>
          </div>

          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">RAM:</p>
            <p className="font-medium">{computerData?.ram}</p>
          </div>

          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">Storage:</p>
            <p className="font-medium">{computerData?.storage}</p>
          </div>

          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">Graphics:</p>
            <p className="font-medium">{computerData?.graphics}</p>
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-col-reverse md:flex-row gap-4 md:justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <form className="relative max-w-md">
            <input
              type="text"
              placeholder="Find by user..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </form>
          <form className="relative max-w-md">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Find by date..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </form>
        </div>
        <Link
          to={`/maintenanceform?computerId=${computerData?._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Add maintenance
        </Link>
      </div>
      <table className="hidden md:table w-full text-left">
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
              {(user.role === "admin" ||
                maintenance.technician._id === user.id) && (
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:hidden space-y-4">
        {filteredMaintenance.map((maintenance) => (
          <MaintenanceByComputerCard
            key={maintenance._id}
            maintenance={maintenance}
            user={user}
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

export default MaintenanceByComputer;
