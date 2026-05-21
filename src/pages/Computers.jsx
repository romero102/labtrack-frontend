import { Search, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

function Computers() {
  const { computers, getComputers, deleteComputer } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState(null);

  useEffect(() => {
    getComputers();
  }, []);

  console.log(computers)

  if (computers.length === 0) return(
    <div className="mb-6 flex justify-between">
      <h1>No Computers</h1>
      <Link
          to="/computerform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Add computer
        </Link>
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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Computers</h1>
      </div>
      <div className="mb-6 flex justify-between">
        <form className="relative max-w-md">
          <input
            type="text"
            placeholder="Find a computer...?"
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
        <Link
          to="/computerform"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Add computer
        </Link>
      </div>
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
            <th className="px-6 py-3">Qr</th>
            <th className="px-6 py-3">Qr</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {computers.map((computer) => (
            <tr
              key={computer._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">{computer.code}</td>
              <td className="px-6 py-4">{computer.lab.name}</td>
              <td className="px-6 py-4">{computer.processor}</td>
              <td className="px-6 py-4">{computer.ram}</td>
              <td className="px-6 py-4">{computer.storage}</td>
              <td className="px-6 py-4">{computer.graphics}</td>
              <td className="px-6 py-4">
                <img
                  src={computer.qrImage}
                  alt="QR Code"
                  className="w-20 h-20"
                />
              </td>
              <td className="px-6 py-4">
                <a
                  href={computer.qrImage}
                  download={`qr_${computer._id}.png`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                >
                  Download
                </a>
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => {
                    const printWindow = window.open("", "_blank");
                    printWindow.document.write(`
            <html>
              <head><title>Print QR</title></head>
              <body style="display:flex;justify-content:center;align-items:center;height:100vh;">
                <img src="${computer.qrImage}" style="max-width:100%;height:auto;" />
                <script>window.print();</script>
              </body>
            </html>
          `);
                    printWindow.document.close();
                  }}
                >
                  Print
                </button>
              </td>
              <td className="px-6 py-4 flex justify-center gap-4">
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

export default Computers;
