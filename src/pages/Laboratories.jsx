import { Search, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

function Laboratories() {
  const { labs, getLabs, deleteLab } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  useEffect(() => {
    getLabs();
  }, []);

  if (labs.length === 0) return(
    <div className="mb-6 flex justify-between">
      <h1>No Laboratories</h1>
      <Link
          to="/laboratoryform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Add laboratory
        </Link>
    </div>
  );

  const handleConfirmDelete = async () => {
    setModalOpen(false);

    const promise = deleteLab(selectedLab._id);

    toast.promise(promise, {
      loading: "Deleting laboratory...",
      success: "Laboratory deleted",
      error: "Something went wrong",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Laboratories</h1>
      </div>
      <div className="mb-6 flex justify-between">
        <form className="relative max-w-md">
          <input
            type="text"
            placeholder="Find a laboratory...?"
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
        <Link
          to="/laboratoryform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Add laboratory
        </Link>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Number of computers</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {labs.map((lab) => (
            <tr key={lab._id} className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-4">{lab.name}</td>
              <td className="px-6 py-4">{lab.location}</td>
              <td className="px-6 py-4">{lab.computerCount}</td>
              <td className="px-6 py-4 flex justify-center gap-4">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this laboratory?"
      />
    </div>
  );
}

export default Laboratories;
