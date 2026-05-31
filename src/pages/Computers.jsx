import {
  Search,
  SquarePen,
  Trash2,
  SquarePlus,
  ScanQrCode,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import ComputerQr from "../components/ComputerQr";
import ComputerCard from "../components/ComputerCard";

function Computers() {
  const {
    computers,
    getComputers,
    deleteComputer,
    loadingComputers,
    getLabs,
    labs,
  } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [noLabsModalOpen, setNoLabsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getComputers();
    getLabs();
  }, []);

  if (loadingComputers) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleAddComputer = () => {
    if (labs.length === 0) {
      setNoLabsModalOpen(true);
    } else {
      navigate("/computerform");
    }
  };

  if (computers.length === 0)
    return (
      <div className="mb-6 flex justify-between">
        <h1>No Computers</h1>
        <button
          onClick={handleAddComputer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition text-center"
        >
          Add computer
        </button>
        <ConfirmModal
        isOpen={noLabsModalOpen}
        onClose={() => setNoLabsModalOpen(false)}
        onConfirm={() => {
          setNoLabsModalOpen(false);
          navigate("/laboratoryform");
        }}
        message="No laboratories found. You need to add a laboratory first. Would you like to add one?"
      />
      </div>
    );

  const handleConfirmDelete = async () => {
    setModalOpen(false);

    const promise = deleteComputer(selectedComputer._id);

    toast.promise(promise, {
      loading: "Deleting computer...",
      success: "Computer deleted",
      error: "Something went wrong",
    });
  };

  const handleDownload = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const filteredComputers = [...computers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((computer) =>
      computer.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Computers</h1>
      </div>
      <div className="mb-6 flex flex-col-reverse gap-4 md:flex-row md:justify-between">
        <form className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Find a computer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
        <Link
          to="/computerform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition text-center"
        >
          Add computer
        </Link>
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Laboratory</th>
              <th className="px-6 py-3">Processor</th>
              <th className="px-6 py-3">Ram</th>
              <th className="px-6 py-3">Storage</th>
              <th className="px-6 py-3">Graphics</th>
              <th className="px-6 py-3">Qr</th>
              <th className="px-6 py-3">Maintenance</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {filteredComputers.map((computer) => (
              <tr
                key={computer._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{computer.code}</td>
                <td className="px-6 py-4">{computer.lab?.name}</td>
                <td className="px-6 py-4">{computer.processor}</td>
                <td className="px-6 py-4">{computer.ram}</td>
                <td className="px-6 py-4">{computer.storage}</td>
                <td className="px-6 py-4">{computer.graphics}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      className="text-green-600 hover:text-green-800 transition"
                      onClick={() => {
                        setSelectedComputer(computer);
                        setQrModalOpen(true);
                      }}
                    >
                      <ScanQrCode />
                    </button>
                    <button
                      onClick={() =>
                        handleDownload(
                          computer.qrImage,
                          `qr_${computer.code}.png`,
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                    >
                      Download
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <Link
                      to={`/maintenanceform?computerId=${computer._id}`}
                      className="text-blue-600 hover:text-blue-800 transition flex items-center"
                    >
                      <SquarePlus className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => {
                        navigate(`/maintenance/${computer._id}`);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                    >
                      History
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <Link
                      to={`/computerform/${computer._id}`}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <SquarePen className="w-5 h-5" />
                    </Link>

                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => {
                        setSelectedComputer(computer);
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
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredComputers.map((computer) => (
          <ComputerCard
            key={computer._id}
            computer={computer}
            setSelectedComputer={setSelectedComputer}
            setQrModalOpen={setQrModalOpen}
            setModalOpen={setModalOpen}
            handleDownload={handleDownload}
          />
        ))}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this computer?"
      />
      
      {qrModalOpen && selectedComputer && (
        <ComputerQr
          computer={selectedComputer}
          onClose={() => {
            setQrModalOpen(false);
            setSelectedComputer(null);
          }}
        />
      )}
    </div>
  );
}

export default Computers;
